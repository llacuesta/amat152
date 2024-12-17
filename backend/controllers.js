// imports
import { BSCSCurriculum } from "./data/curriculum_data.js";
import { getCoursesDP, getTakenAndRemainingCourses } from "./core/functions.js";
import { Curriculum } from "./core/curriculum.js";

// handle endpoints
export function getTest() { return (req, res) => {
    console.log("Test API");
    return res.send({ success: true })
}; }


export function getCourseHandler() { return (req, res) => {
    const { sem, haventTaken, priority, workloadPreference } = req.body;
    const curriculum = new Curriculum(BSCSCurriculum);
    const suggestedCourses = getCoursesDP(curriculum, sem, haventTaken, priority, workloadPreference);
    return res.send({ success: true, suggestedCourses });
}; }

export function getTakenAndRemainingHandler() { return (req, res) => {
    const { year, sem } = req.body;
    const curriculum = new Curriculum(BSCSCurriculum);
    const { taken, remaining } = getTakenAndRemainingCourses(curriculum, year, sem);
    return res.send({ success: true, taken, remaining });
}; }