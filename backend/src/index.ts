import express from "express";
import cors from "cors";
import db from "./config/connection";
import apiRouter from "./routes";
import * as bodyParser from "body-parser";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.get("/", (req, res, next) => {
  res.send("hello world");
});

app.listen(5000, function () {
  console.log(`Started application on port 5000`);
  db.then((data) => {
    // Cron Job Started
    console.log(
      `Database connection Established with ${data.connection.name}!`
    );
  }).catch((err) => {
    console.log({ err });
    console.log("Error connecting to Database!");
  });
});
