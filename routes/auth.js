const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000";

router.get("/login/success", (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        //   cookies: req.cookies
      });
    }
  } catch (error) {
    console.log(error)
  }
});

router.get("/login/failed", (req, res) => {
 try {
  res.status(401).json({
    success: false,
    message: "failure",
  });
 } catch (error) {
  console.log(error)

 }
});

router.get("/logout", (req, res) => {
  try {
    req.logout(req.user, (err) => {
      if (err) return next(err);
      res.redirect(CLIENT_URL);
    });
  } catch (error) {
    console.log(error)

  }
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);
router.get(
  "/facebook",
  // passport.authenticate("facebook", { scope: ["profile"] })
  passport.authenticate("facebook")
);

router.get("/auth/error", (req, res) => res.send("Unknown Error"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;
