// imports
const { BSCSCurriculum } = require("./data/curriculum_data.js");
const { getCourses, getTakenAndRemainingCourses } = require("./core/functions.js");

// handle endpoints
exports.getTest = () => (req, res) => {
    console.log("Test API");
    return res.send({ success: true })
}

exports.getCourseHandler = () => (req, res) => {
    console.log(req.body);
    return res.send({ success: true })
}

exports.getTakenAndRemainingHandler = () => (req, res) => {
    console.log(req.body)
    return res.send({ success: true })
}