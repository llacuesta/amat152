import express, { json } from "express";
import routes from "./routes.js";

const app = express();
const PORT = 3000;

// middleware
app.use(json()); // To parse JSON request bodies
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Access-Control-Allow-Methods, Origin, Accept, Content-Type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

routes(app);

// start server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server listening at port " + PORT);
  }
});
