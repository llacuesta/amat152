const controllers = require("./controllers")

module.exports = (app) => {
    // endpoints
    app.get("/", controllers.getTest());
    app.post("/get-taken-courses", controllers.getCourseHandler());
    // app.post("/get-suggested-courses", getCourses)
}