import {
  getTest,
  getTakenAndRemainingHandler,
  getCourseHandler,
} from "./controllers.js";

export default (app) => {
  // endpoints
  app.get("/", getTest());
  app.post("/get-taken-courses", getTakenAndRemainingHandler());
  app.post("/get-suggested-courses", getCourseHandler());
};
