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
function getCoursesDP(curriculum, sem, haventTaken = [], priority = [], workloadPreference = 'balanced') {
    const courses = curriculum.topologicalSort().filter(courseId => {
        const course = curriculum.getCourseById(courseId);
        return haventTaken.includes(courseId) || priority.includes(courseId) || course.availability.includes(sem);
    });

    const n = courses.length;
    const m = 8; // Assuming 8 semesters for a 4-year course

    // Initialize dp table
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(Infinity));
    dp[0][0] = 0;

    // Initialize workload table
    const workload = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

    // Fill dp table
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            let currentWorkload = 0;
            for (let k = i; k >= 1; k--) {
                currentWorkload += curriculum.getCourseById(courses[k - 1]).workload;
                if (workloadPreference === "max") {
                    dp[i][j] = Math.min(dp[i][j], Math.max(dp[k - 1][j - 1], currentWorkload));
                } else if (workloadPreference === "min") {
                    dp[i][j] = Math.min(dp[i][j], Math.min(dp[k - 1][j - 1], currentWorkload));
                } else {
                    dp[i][j] = Math.min(dp[i][j], Math.max(dp[k - 1][j - 1], currentWorkload));
                }
                workload[i][j] = currentWorkload;
            }
        }
    }

    // Backtrack to find the optimal course distribution
    let i = n, j = m;
    const suggestedCourses = new Set();
    while (i > 0 && j > 0) {
        let currentWorkload = workload[i][j];
        for (let k = i; k >= 1; k--) {
            if (dp[i][j] === Math.max(dp[k - 1][j - 1], currentWorkload)) {
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
    getCoursesDP,
    getTakenAndRemainingCourses
}