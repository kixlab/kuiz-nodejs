require("dotenv").config();

// Core
const express = require("express");
const path = require("path");
const cors = require("cors");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Cloud & DB
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const mongodb = require("mongodb");
const mongoose = require("mongoose");

// Utilities
const dotenv = require("dotenv");
const logger = require("morgan");

// Endpoints & Ports
const SERVER_ENDPOINT =
  process.env.BUILD_ENV === "local" ? "13.124.178.61" : "localhost";
const DB_PORT = process.env.BUILD_ENV === "production" ? 50000 : 40000;
const DB_ENDPOINT = `mongodb://${SERVER_ENDPOINT}:${DB_PORT}/kuizdb`;

// Create Express App
const app = express();
app.set("view engine", "jade");
app.set("views", path.join(__dirname, "views"));

// Load Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger("dev"));
app.use(cors());

// Connect to Database
mongoose
  .connect(DB_ENDPOINT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected to " + DB_ENDPOINT))
  .catch((error) => console.log(error));

//Load Router
const authRouter = require("./src/routes/auth");
const classRouter = require("./src/routes/class");
const userRouter = require("./src/routes/user");
app.use("/auth", authRouter);
app.use("/class", classRouter);
app.use("/user", userRouter);

// Create Error Object
app.use(function (req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
