import  {Curriculum}  from "./curriculum.js";
/**
 * Generates course suggestions for the next semester based on dynamic programming and workload preferences.
 * 
 * @param {Curriculum} curriculum - An instance of the Curriculum class containing the course data.
 * @param {number} sem - The current semester for which course suggestions are being generated.
 * @param {string[]} haventTaken - An array of course IDs that the student hasn't taken yet.
 * @param {string[]} priority - An array of course IDs that are prioritized for the next semester.
 * @param {string} workloadPreference - A string indicating the workload preference ('max', 'min', or 'balanced').
 * @returns {Object[]} - An array of suggested courses, each represented as an object with courseId, courseName, workload, and units.
 */
function getCoursesDP(curriculum, sem, haventTaken = [], priority = [], workloadPreference = 'balanced') {
    const courses = curriculum.topologicalSort().filter(courseId => {
        const course = curriculum.getCourseById(courseId);
        return haventTaken.includes(courseId) || priority.includes(courseId) || course.availability.includes(sem);
    });

    const n = courses.length;
    const m = 12; // 12 semesters for a 4-year course

    // Initialize dp table
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(Infinity));
    dp[0][0] = 0;

    // Initialize workload table
    const workload = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    // Fill dp table with memoization
    const memo = {};
    function getWorkload(i, j) {
        if (memo[`${i}-${j}`] !== undefined) return memo[`${i}-${j}`];
        let currentWorkload = 0;
        for (let k = i; k >= 1; k--) {
            const course = curriculum.getCourseById(courses[k - 1]);
            if (!course.availability.includes(sem) || !haventTaken.includes(course.id)) continue;

            const prereqsMet = course.prereqs.every(prereq => !haventTaken.includes(prereq));
            if (!prereqsMet) continue;

            currentWorkload += course.workload;
            if (workloadPreference === "max") {
                dp[i][j] = Math.min(dp[i][j], Math.max(dp[k - 1][j - 1], currentWorkload));
            } else if (workloadPreference === "min") {
                dp[i][j] = Math.min(dp[i][j], Math.min(dp[k - 1][j - 1], currentWorkload));
            } else { // balanced
                dp[i][j] = Math.min(dp[i][j], dp[k - 1][j - 1] + currentWorkload);
            }
            workload[i][j] = currentWorkload;
        }
        memo[`${i}-${j}`] = dp[i][j];
        return dp[i][j];
    }

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            getWorkload(i, j);
        }
    }

    // Backtrack to find the optimal course distribution
    let i = n, j = m;
    const suggestedCourses = new Set();
    while (i > 0 && j > 0) {
        let currentWorkload = workload[i][j];
        for (let k = i; k >= 1; k--) {
            const course = curriculum.getCourseById(courses[k - 1]);
            if (!course.availability.includes(sem) || !haventTaken.includes(course.id)) continue;

            const prereqsMet = course.prereqs.every(prereq => !haventTaken.includes(prereq));
            if (!prereqsMet) continue;

            let condition;
            if (workloadPreference === "max") {
                condition = dp[i][j] === Math.max(dp[k - 1][j - 1], currentWorkload);
            } else if (workloadPreference === "min") {
                condition = dp[i][j] === Math.min(dp[k - 1][j - 1], currentWorkload);
            } else { // balanced
                condition = dp[i][j] === dp[k - 1][j - 1] + currentWorkload;
            }

            if (condition) {
                for (let l = k; l <= i; l++) {
                    const course = curriculum.getCourseById(courses[l - 1]);
                    if (!suggestedCourses.has(course.id)) {
                        suggestedCourses.add(course.id);
                    }
                }
                i = k - 1;
                j--;
                break;
            }
            currentWorkload -= curriculum.getCourseById(courses[k - 1]).workload;
        }
    }

    return Array.from(suggestedCourses).map(courseId => curriculum.getCourseById(courseId)).reverse();
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

            semesterData.courses.forEach(course => {
                if (
                    yearInt < year || (yearInt === year && semInt < sem)
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



export {
    getCoursesDP,
    getTakenAndRemainingCourses
}