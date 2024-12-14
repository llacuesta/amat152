import { BSCSCurriculum } from "../data/curriculum_data.js";
import Curriculum from "./curriculum.js";

function getCourses(curriculum, year, sem, criterion, isMax, haventTaken = [], priority = []) {
    // get all courses for indicated sem
    let semData = curriculum.getSemester(year, sem);
    let availableCourseIds = [...priority];
    availableCourseIds.push(...haventTaken);
    availableCourseIds.push(...semData.courses.map(course => course.id));

    // filter ineligible courses using dfs
    let ineligible = new Set();
    function markIneligible(courseId) {
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
    
    // remove priority course dependents first before removing havent taken
    // this is to avoid cases where priority depends on havent taken
    priority.forEach(courseId => {
        markIneligible(courseId);
    });
    ineligible.delete(...priority)
    haventTaken.forEach(courseId => {
        markIneligible(courseId);
    });
    ineligible.delete(...haventTaken)
    availableCourseIds = availableCourseIds.filter(courseId => !ineligible.has(courseId));

    // get suggested courses
    let minUnits = semData.minUnits;
    let currentUnits = 0;
    let suggestedCourses = [];
    let nextYear = year;
    let nextSem = sem;
    // processing available courses
    for (let course of availableCourseIds) {
        if (currentUnits < minUnits) {
            let newCourse = curriculum.getCourseById(course);
            suggestedCourses.push(newCourse);
            currentUnits += newCourse.units;
        } else {
            break;
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
    
        // process newly queued semester courses
        for (let courseId of availableCourseIds) {
            if (currentUnits < minUnits) {
                let newCourse = curriculum.getCourseById(courseId);
                
                if (!suggestedCourses.some(c => c.id === courseId)) {
                    suggestedCourses.push(newCourse);
                    currentUnits += newCourse.units;
                }
            } else {
                break;
            }
        }
    }

    return suggestedCourses
}

// curriculum class
const curriculum = new Curriculum(BSCSCurriculum);

const selectedCourses = getCourses(
    curriculum,
    2, 
    1, 
    "workload", // Optimize for max workload
    true, // Maximize workload
    ["cmsc12"], // Courses haven't taken yet (still available for selection)
    ["cmsc21"]  // Prioritize CMSC 21
);

// TODO: move general electives to respective years
// TODO: add criteria optimization
// TODO: upddate course data return value
// TODO: move the ineligible logic to curriculum.js class
console.log(selectedCourses);