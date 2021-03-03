const express = require("express");
const router = express.Router();

const { sessionName } = require("../configs/config");

const { ErrorHandler } = require("../errors/error");

router.get("/", ({ session: { person } }, res) => {
  if (person) {
    return res.json(person);
  } else {
    return res.end();
  }
});

router.delete("/logout", isLoggedIn, ({ session }, res, next) => {
  const { person } = session;
  if (person) {
    session.destroy((err) => {
      if (err) {
        next(new ErrorHandler(500, "Internal server error", err.message));
      }
      res.clearCookie(sessionName);
      return res.end("You are logged out");
    });
  }
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
