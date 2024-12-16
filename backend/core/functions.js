const { Curriculum } = require("./curriculum")

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
function getCourses(curriculum, year, sem, criterion, isMax, haventTaken = [], priority = []) {
    /*
        HELPER FUNCTIONS
    */
    // marks if a course is ineligible
    const markIneligible = (courseId) => {
        let stack = [courseId];
        
        while (stack.length > 0) {
            let current = stack.pop();
            
            if (curriculum.graph[current] && !ineligible.has(current)) {
                curriculum.graph[current].edges.forEach(childCourse => {
                    if (!ineligible.has(childCourse)) {
                        stack.push(childCourse);
                    }
                });
                ineligible.add(current);
            }
        }
    }
    // sorts courses by workload
    const sortCoursesByWorkload = (courseIds, ascending = true) => {
        return courseIds.sort((a, b) => {
            const workloadA = curriculum.getCourseById(a).workload;
            const workloadB = curriculum.getCourseById(b).workload;
            return ascending ? workloadA - workloadB : workloadB - workloadA;
        });
    };
    // replace courses occassionally according to workload
    const replaceBetterCourse = (newCourse, isMax) => {
        let leastCourseIdx = -1;
        let leastWorkload = isMax ? -Infinity : Infinity;
    
        for (let i = 0; i < suggestedCourses.length; i++) {
            const workload = suggestedCourses[i].workload;
    
            if ((isMax && workload < leastWorkload) || (!isMax && workload > leastWorkload)) {
                leastWorkload = workload;
                leastCourseIdx = i;
            }
        }
    
        if (leastCourseIdx !== -1 && ((isMax && newCourse.workload > leastWorkload) || (!isMax && newCourse.workload < leastWorkload))) {
            suggestedCourses[leastCourseIdx] = newCourse;
            currentUnits += newCourse.units - suggestedCourses[leastCourseIdx].units;
        }
    };
    
    /*
        FUNCTION LOGIC
    */
    // get all courses for indicated sem
    let semData = curriculum.getSemester(year, sem);
    let availableCourseIds = [...priority];
    availableCourseIds.push(...haventTaken);
    availableCourseIds.push(...semData.courses.map(course => course.id));

    // filter ineligible courses using dfs
    // remove priority course dependents first before removing havent taken
    // this is to avoid cases where priority depends on havent taken
    let ineligible = new Set();
    priority.forEach(courseId => {
        markIneligible(courseId);
    });
    ineligible.delete(...priority)
    haventTaken.forEach(courseId => {
        markIneligible(courseId);
    });
    ineligible.delete(...haventTaken)
    availableCourseIds = availableCourseIds.filter(courseId => !ineligible.has(courseId));

    // topological sorting to ensure valid course order
    const sortedCourseIds = curriculum.topologicalSort();
    availableCourseIds = availableCourseIds.filter(courseId => sortedCourseIds.includes(courseId));

    // filter courses by availability
    availableCourseIds = availableCourseIds.filter(courseId => {
        const course = curriculum.getCourseById(courseId);
        return course.availability.includes(sem);
    });

    // optimizing according to criterion
    let minUnits = 15;
    if (criterion === "units") {
        if (isMax === true) {
            minUnits = 12;
        } else if (isMax === false) {
            minUnits = 18;
        }
    }

    // get suggested courses
    let currentUnits = 0;
    let suggestedCourses = [];
    let nextYear = year;
    let nextSem = sem;
    // processing available courses
    if (criterion === "workload" && isMax !== undefined) {
        availableCourseIds = sortCoursesByWorkload(availableCourseIds, isMax); // sort by workload
    }
    for (let course of availableCourseIds) {
        if (currentUnits < minUnits) {
            let newCourse = curriculum.getCourseById(course);
            suggestedCourses.push(newCourse);
            currentUnits += newCourse.units;
        } else if (criterion === "workload" && isMax !== undefined) {
            let newCourse = curriculum.getCourseById(course);
            replaceBetterCourse(newCourse, isMax);
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
            break; // all semesters done
        }
    
        availableCourseIds.push(...nextSemData.map(course => course.id));
        availableCourseIds = availableCourseIds.filter(courseId => !ineligible.has(courseId));
        if (criterion === "workload" && isMax !== undefined) {
            availableCourseIds = sortCoursesByWorkload(availableCourseIds, isMax);
        }

        // process newly queued semester courses
        for (let courseId of availableCourseIds) {
            if (currentUnits < minUnits) {
                let newCourse = curriculum.getCourseById(courseId);
                
                if (!suggestedCourses.some(c => c.id === courseId)) {
                    suggestedCourses.push(newCourse);
                    currentUnits += newCourse.units;
                }
            } else if (criterion === "workload" && isMax !== undefined) {
                let newCourse = curriculum.getCourseById(courseId);
                replaceBetterCourse(newCourse, isMax);
            }
        }
    }

    return suggestedCourses
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
        for (const semKey in curriculum.curriculumData[yearKey]) {

            const semesterData = curriculum.curriculumData[yearKey][semKey];
            if (!semesterData || !semesterData.courses) continue;

            semesterData.courses.forEach(course => {
                if (
                    yearKey < year || 
                    (yearKey === year && semKey < sem)
                ) {
                    taken.push(course);
                } else {
                    remaining.push(course)
                }
            });
        }
    }

    return { taken, remaining };
}

module.exports = {
    getCourses,
    getTakenAndRemainingCourses
}