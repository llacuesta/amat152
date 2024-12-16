const controllers = require("./controllers")

module.exports = (app) => {
    // endpoints
    app.get("/", controllers.getTest());
    app.post("/get-taken-courses", controllers.getTakenAndRemainingHandler());
    app.post("/get-suggested-courses", controllers.getCourseHandler());
}