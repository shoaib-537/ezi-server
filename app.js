var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const { Strategy } = require("passport-local");
var cors = require("cors");
const multer = require("multer");
const common = require("./beans/common");

const inputMiddleware = require("./middlewares/inputMiddleware");
const {
  userRoute,
  adminRoute,
  studentRoute,
  studentProfileRoute,
} = require("./routes");

const authMiddleware = require("./middlewares/authMiddleware");

var app = express();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); //Appending .jpg
  },
});

var upload = multer({ storage: storage });
// const upload = multer({ storage: storage });

//DB Connection
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/ams", (err) => {
  if (err) {
    return console.log("error connecting with DB", err);
  }
  console.log("DateBase connected successfully");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

passport.use(
  new Strategy((regNum, password, done) => {
    authMiddleware.executeLogin(regNum, password, done);
  })
);

// actual routes
// app.use(inputMiddleware.handleOptions);
app.post("/signup", authMiddleware.userSignup);
app.post(
  "/signin",
  common.signin
);
app.post("/upload", upload.single("file"), function (req, res, next) {
  return res.status(200).json(req.file);
});
// test routes
// app.use('/', indexRouter);
app.use("/users", userRoute); //Mount userRoute in express
app.use("/admin", adminRoute); //Mount adminRoute in express
app.use("/student", studentRoute); //Mount clientRoute in express
app.use(authMiddleware.verifyToken);
app.use(
  "/student/profile",
  authMiddleware.checkStudentPermissions,
  studentProfileRoute
);

// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
