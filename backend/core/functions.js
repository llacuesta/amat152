import { Curriculum } from "./curriculum.js";
/**
 * Generates course suggestions for next semester.
 *
 * @param {Curriculum} curriculum
 * @param {int} year
 * @param {int} sem
 * @param {string} criterion
 * @param {boolean} isMax
 * @param {[string]} haventTaken
 * @param {[string]} priority
 * @returns [{ courseId, courseName, workload, units }]
 */
function getCourses(
  curriculum,
  year,
  sem,
  criterion,
  isMax,
  haventTaken = [],
  priority = [],
  minUnits=15
) {
  /*
        HELPER FUNCTIONS
    */
  // marks if a course is ineligible
  const markIneligible = (courseId) => {
    let stack = [courseId];

    while (stack.length > 0) {
      let current = stack.pop();

      if (curriculum.graph[current] && !ineligible.has(current)) {
        curriculum.graph[current].edges.forEach((childCourse) => {
          if (!ineligible.has(childCourse)) {
            stack.push(childCourse);
          }
        });
        ineligible.add(current);
      }
    }
  };
  // sorts courses by workload
  const sortCoursesByWorkload = (courseIds, ascending = true) => {
    return courseIds.sort((a, b) => {
      const workloadA = curriculum.getCourseById(a)?.workload;
      const workloadB = curriculum.getCourseById(b)?.workload;
      return ascending ? workloadA - workloadB : workloadB - workloadA;
    });
  };
  // replace courses occassionally according to workload
  const replaceBetterCourse = (newCourse, isMax) => {
    let leastCourseIdx = -1;
    let leastWorkload = isMax ? -Infinity : Infinity;

    for (let i = 0; i < suggestedCourses.length; i++) {
      const workload = suggestedCourses[i].workload;

      if (
        (isMax && workload < leastWorkload) ||
        (!isMax && workload > leastWorkload)
      ) {
        leastWorkload = workload;
        leastCourseIdx = i;
      }
    }

    if (
      leastCourseIdx !== -1 &&
      ((isMax && newCourse.workload > leastWorkload) ||
        (!isMax && newCourse.workload < leastWorkload))
    ) {
      suggestedCourses[leastCourseIdx] = newCourse;
      currentUnits += newCourse.units - suggestedCourses[leastCourseIdx].units;
    }
  };

  /*
        FUNCTION LOGIC
    */
  // Track added courses using a Set
  let addedCourseIds = new Set();

  // get all courses for indicated sem
  let semData = curriculum.getSemester(year, sem);
  let availableCourseIds = [...priority];
  availableCourseIds.push(...haventTaken);
  availableCourseIds.push(...semData.courses.map((course) => course.id));

  /* ineligible filtering remains the same... */

  // get suggested courses
  let currentUnits = 0;
  let suggestedCourses = [];
  let nextYear = year;
  let nextSem = sem;

  // processing available courses
  if (criterion === "workload" && isMax !== undefined) {
    availableCourseIds = sortCoursesByWorkload(availableCourseIds, isMax);
  }

  for (let courseId of availableCourseIds) {
    if (!addedCourseIds.has(courseId)) {
      // Check if course already added
      if (currentUnits < minUnits) {
        let newCourse = curriculum.getCourseById(courseId);
        suggestedCourses.push(newCourse);
        currentUnits += newCourse.units;
        addedCourseIds.add(courseId); // Track added course
      } else if (criterion === "workload" && isMax !== undefined) {
        let newCourse = curriculum.getCourseById(courseId);
        replaceBetterCourse(newCourse, isMax);
        addedCourseIds.add(courseId); // Track added course
      }
    }
  }

  // queue up new semesters if minUnits is not reached
  while (currentUnits < minUnits) {
    if (nextSem == 2) {
      nextYear += 1;
      nextSem = 1;
    } else {
      nextSem += 1;
    }

    let nextSemData = curriculum.getCourses(nextYear, nextSem);
    if (!nextSemData || nextSemData.length === 0) {
      break;
    }

    // Only add courses that haven't been processed yet
    let newCourseIds = nextSemData
      .map((course) => course.id)
      .filter((id) => !addedCourseIds.has(id) && !ineligible.has(id));

    availableCourseIds = [...newCourseIds];

    if (criterion === "workload" && isMax !== undefined) {
      availableCourseIds = sortCoursesByWorkload(availableCourseIds, isMax);
    }

    for (let courseId of availableCourseIds) {
      if (!addedCourseIds.has(courseId)) {
        // Check if course already added
        if (currentUnits < minUnits) {
          let newCourse = curriculum.getCourseById(courseId);
          suggestedCourses.push(newCourse);
          currentUnits += newCourse.units;
          addedCourseIds.add(courseId); // Track added course
        } else if (criterion === "workload" && isMax !== undefined) {
          let newCourse = curriculum.getCourseById(courseId);
          replaceBetterCourse(newCourse, isMax);
          addedCourseIds.add(courseId); // Track added course
        }
      }
    }
  }

  return suggestedCourses;
}

/**
 * Gets the already taken and remaining courses based on year and sem.
 *
 * @param {Curriculum} curriculum
 * @param {int} year
 * @param {int} sem
 * @returns { [taken], [remaining] }
 */

function getTakenAndRemainingCourses(curriculum, year, sem) {
  const taken = [];
  const remaining = [];

  for (const yearKey in curriculum.curriculumData) {
    const yearInt = parseInt(yearKey, 10);
    for (const semKey in curriculum.curriculumData[yearKey]) {
      const semInt = parseInt(semKey, 10);

      const semesterData = curriculum.curriculumData[yearKey][semKey];
      if (!semesterData || !semesterData?.courses) continue;

      semesterData.courses.forEach((course) => {
        if (yearInt < year || (yearInt === year && semInt < sem)) {
          taken.push(course);
        } else {
          remaining.push(course);
        }
      });
    }
  }

  return { taken, remaining };
}

export { getCourses, getTakenAndRemainingCourses };
