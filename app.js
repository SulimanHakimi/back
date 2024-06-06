const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const passportSetup = require("./passport");
const passport = require("passport");
const authRoute = require("./routes/auth");
// const db = require("./db");
const app = express();
// db.connect();
require("dotenv").config();

app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: "session",
    keys: ["suliman"],
    maxAge: 60 * 60 * 24 * 30 * 1000,
    domain: ".vercel.app",
  })
);
app.use(function (request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb) => {
      cb();
    };
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb) => {
      cb();
    };
  }
  next();
});
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: [
      "https://back-jade-eight.vercel.app",
      "https://front-theta-mocha.vercel.app",
    ],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders: true,
  })
);

app.use("/auth", authRoute);

app.listen("4000", () => {
  console.log("Server is running!");
});
