const express = require("express");
const router = express.Router();

const { roleAdmin } = require("../configs/config");
const Person = require("../models/registration.model");

const { ErrorHandler } = require("../errors/error");

router.get("/", isLoggedInAdmin, (req, res, next) => {
  Person.find({})
    .select("-password")
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      }
    })
    .catch((err) => {
      if (err) {
        next(new ErrorHandler(500, "Internal server error", err.message));
      }
    });
});

router.delete("/delete/:id", isLoggedInAdmin, (req, res, next) => {
  const id = req.params.id;

  const info1 = {
    alert: "",
  };

  const info2 = {
    success: "",
  };

  Person.findByIdAndDelete({ _id: id })
    .then((response) => {
      if (!response) {
        info1.alert = "User doesn't exist";
        return res.status(400).json(info1);
      }

      info2.success = `User ${response.name} removed successfully`;
      return res.status(200).json(info2);
    })
    .catch((err) => {
      if (err) {
        next(new ErrorHandler(500, "Internal server error", err.message));
      }
    });
});

module.exports = router;

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
