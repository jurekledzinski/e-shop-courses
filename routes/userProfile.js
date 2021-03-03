const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Person = require("../models/registration.model");

const { ErrorHandler } = require("../errors/error");

router.put("/", isLoggedIn, (req, res, next) => {
  const { name, email, password, confirmPassword, userId } = req.body;

  const info = {
    alert: "",
  };

  if (!name || !email || !password || !confirmPassword) {
    info.alert = "Please fill in all fields";
    return res.status(401).json(info);
  }

  if (password !== confirmPassword) {
    info.alert = "Incorrect password, passwords don't match!";
    return res.status(401).json(info);
  }

  if (!Boolean(info.alert)) {
    Person.find({ $or: [{ email: email }, { name: name }] }, (err, data) => {
      if (err) {
        const info1 = {
          alert: "Internal server error",
          status: 500,
        };

        return res.status(500).json(info1);
      }

      let checkData = data.find((item) => item._id.toString() !== userId);

      if (Boolean(checkData) && checkData._id.toString() !== userId) {
        if (checkData.name === req.body.name) {
          info.alert = "User name already exist!";
          return res.status(401).json(info);
        } else {
          info.alert = "User email already exist!";
          return res.status(401).json(info);
        }
      } else {
        data[0].name = name;
        data[0].email = email;
        data[0].password = password;

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(data[0].password, salt, (err, hash) => {
            if (err) throw err;
            data[0].password = hash;

            data[0]
              .save()
              .then((response) => {
                const info2 = {
                  success: "Profile updated successfully",
                };

                return res.status(200).json(info2);
              })
              .catch((err) => {
                if (err) {
                  next(
                    new ErrorHandler(500, "Internal server error", err.message)
                  );
                }
              });
          });
        });
      }
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
