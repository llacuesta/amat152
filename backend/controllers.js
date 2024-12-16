// imports
const { BSCSCurriculum } = require("./data/curriculum_data.js");
const { getCourses, getTakenAndRemainingCourses } = require("./core/functions.js");

// handle endpoints
exports.getTest = () => (req, res) => {
    console.log("Test API");
    return res.send({ success: true })
}

exports.getCourseHandler = () => (req, res) => {
    const { year, sem, criterion, isMax, haventTaken, priority } = req.body;
    const curriculum = new Curriculum(BSCSCurriculum);
    const suggestedCourses = getCourses(curriculum, year, sem, criterion, isMax, haventTaken, priority);
    return res.send({ success: true, suggestedCourses });
}

exports.getTakenAndRemainingHandler = () => (req, res) => {
    const { year, sem } = req.body;
    const curriculum = new Curriculum(BSCSCurriculum);
    const { taken, remaining } = getTakenAndRemainingCourses(curriculum, year, sem);
    return res.send({ success: true, taken, remaining });
}