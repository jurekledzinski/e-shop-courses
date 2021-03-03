const express = require("express");
const router = express.Router();
const passport = require("passport");

const { ErrorHandler } = require("../errors/error");

const { sessionizeUser } = require("../utils/helpers");

router.post("/", notLoggedIn, (req, res, next) => {
  const { email, password } = req.body;

  let info = {
    alert: "",
  };

  if ((!email && !password) || !email || !password) {
    info.alert = "Please fill in all fields";
    return res.status(400).json(info);
  }

  passport.authenticate("local", (err, user) => {
    if (err) {
      next(new ErrorHandler(500, "Internal server error", err.message));
    }

    if (!user) {
      info.alert = "Incorrect email or password";
      return res.status(404).json(info);
    }

    req.logIn(user, function (err) {
      if (err) {
        return next(
          new ErrorHandler(500, "Internal server error", err.message)
        );
      }
      const info2 = {
        success: "You are logged!",
        user: user.name,
        email: user.email,
        userId: user._id,
        role: user.role,
      };

      const sessionUser = sessionizeUser(user);
      req.session.person = sessionUser;

      return res.status(200).json(info2);
    });
  })(req, res, next);
});

module.exports = router;

function notLoggedIn(req, res, next) {
  let info = {
    alert: "You are already logged in",
  };
  if (!req.isAuthenticated()) {
    return next();
  } else {
    return res.status(400).json(info);
  }
  res.redirect("/");
}
