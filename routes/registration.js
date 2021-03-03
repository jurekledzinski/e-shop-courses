const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const Person = require("../models/registration.model");

const { ErrorHandler } = require("../errors/error");

router.post("/user", notLoggedIn, (req, res, next) => {
  const { name, email, password, password2, role } = req.body;

  let info = {
    alert: "",
    user: {
      name,
      email,
      password,
      password2,
      role,
    },
    message: "",
  };

  if (!name || !email || !password || !password2) {
    info.alert = "Please fill in all fields!";
    res.status(401).json(info);
  }

  if (password !== password2) {
    info.alert = "Passwords don't match!";
    res.status(401).json(info);
  }

  if (!info.alert) {
    Person.findOne(
      {
        $or: [
          {
            email: req.body.email,
          },
          {
            name: req.body.name,
          },
        ],
      },
      (err, data) => {
        if (err) {
          next(new ErrorHandler(500, "Internal server error", err.message));
        } else {
          if (data) {
            if (data.name === req.body.name) {
              info.alert = "User name already exist!";
              res.status(401).json(info);
            } else {
              info.alert = "User email already exist!";
              res.status(401).json(info);
            }
          } else {
            Person.countDocuments({}, function (err, count) {
              let newRegistration = [];
              if (count < 1) {
                newRegistration.push({
                  name: req.body.name,
                  email: req.body.email,
                  password: req.body.password,
                  role: "Admin",
                });
              } else {
                newRegistration.push({
                  name: req.body.name,
                  email: req.body.email,
                  password: req.body.password,
                  role: "User",
                });
              }

              const [newUser] = newRegistration;
              const newRegisteredPerson = new Person(newUser);

              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newRegisteredPerson.password, salt, (err, hash) => {
                  if (err) throw err;
                  newRegisteredPerson.password = hash;

                  newRegisteredPerson
                    .save()
                    .then((data) => {
                      const { _id, name, email, role } = data;
                      const info2 = {
                        success: "You are registered!",
                        newRegisteredPerson: {
                          _id,
                          name,
                          email,
                          role,
                        },
                      };

                      newRegistration = [];
                      return res.status(200).json(info2);
                    })
                    .catch((err) => {
                      next(
                        new ErrorHandler(
                          500,
                          "Internal server error",
                          err.message
                        )
                      );
                    });
                });
              });
            });
          }
        }
      }
    );
  }
});

module.exports = router;

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
