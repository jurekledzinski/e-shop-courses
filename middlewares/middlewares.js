const { roleAdmin } = require("../configs/config");

function isLoggedInAdmin(req, res, next) {
  if (req.isAuthenticated()) {
    const userRole = req.session.person.role;
    if (userRole === roleAdmin) {
      return next();
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

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

module.exports = { isLoggedInAdmin, isLoggedIn, notLoggedIn };
