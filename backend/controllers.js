// imports
import { BSCSCurriculum } from "./data/curriculum_data.js";
import { getCourses, getTakenAndRemainingCourses } from "./core/functions.js";
import { Curriculum } from "./core/curriculum.js";

// handle endpoints
export function getTest() { return (req, res) => {
    console.log("Test API");
    return res.send({ success: true })
}; }

export function getCourseHandler() { return (req, res) => {
    const { year, sem, criterion, isMax, haventTaken, priority } = req.body;
    const curriculum = new Curriculum(BSCSCurriculum);
    const suggestedCourses = getCourses(curriculum, year, sem, criterion, isMax, haventTaken, priority);
    return res.send({ success: true, suggestedCourses });
}; }

export function getTakenAndRemainingHandler() { return (req, res) => {
    const { year, sem } = req.body;
    const curriculum = new Curriculum(BSCSCurriculum);
    const { taken, remaining } = getTakenAndRemainingCourses(curriculum, year, sem);
    return res.send({ success: true, taken, remaining });
}; }