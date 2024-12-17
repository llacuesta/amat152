// imports
const { BSCSCurriculum } = require("./data/curriculum_data.js");
const { getCoursesDP, getTakenAndRemainingCourses } = require("./core/functions.js");

// handle endpoints
exports.getTest = () => (req, res) => {
    console.log("Test API");
    return res.send({ success: true })
}

exports.getCourseHandler = () => (req, res) => {
    const { sem, haventTaken, priority, workloadPreference } = req.body;
    const curriculum = new Curriculum(BSCSCurriculum);
    const suggestedCourses = getCoursesDP(curriculum, sem, haventTaken, priority, workloadPreference);
    return res.send({ success: true, suggestedCourses });
}

exports.getTakenAndRemainingHandler = () => (req, res) => {
    const { year, sem } = req.body;
    const curriculum = new Curriculum(BSCSCurriculum);
    const { taken, remaining } = getTakenAndRemainingCourses(curriculum, year, sem);
    return res.send({ success: true, taken, remaining });
}