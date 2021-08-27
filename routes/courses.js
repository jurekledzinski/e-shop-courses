const express = require("express");
const router = express.Router();

const { roleAdmin } = require("../configs/config");
const Course = require("../models/course.model");

const { ErrorHandler } = require("../errors/error");

router.get("/", (req, res, next) => {
  Course.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      if (err) {
        next(new ErrorHandler(500, "Internal server error", err.message));
      }
    });
});

router.post("/add-new", isLoggedInAdmin, (req, res, next) => {
  const {
    titleCourse,
    imagePath,
    priceCourse,
    authorCourse,
    onStock,
    description,
    averageRate,
    dateMilliseconds,
    dateString,
  } = req.body;

  let info = {
    alert: "",
  };

  if (
    !titleCourse &&
    !imagePath &&
    !priceCourse &&
    !authorCourse &&
    !onStock &&
    !description
  ) {
    throw new ErrorHandler(404, "Please fill in all fields");
  }

  if (
    !titleCourse ||
    !imagePath ||
    !priceCourse ||
    !authorCourse ||
    !onStock ||
    !description
  ) {
    throw new ErrorHandler(404, "All fields have to be filled in");
  }

  if (Boolean(!info.alert)) {
    Course.findOne({ title: titleCourse })
      .then((response) => {
        if (response) {
          next(ErrorHandler(400, "Course is already added, add diffrent one"));
        } else {
          const course = {
            title: titleCourse,
            imagePath: imagePath,
            price: parseFloat(priceCourse),
            author: authorCourse,
            amount: onStock,
            description: description,
            averageRate,
            dateMilliseconds,
            dateString,
          };
          const newCourse = new Course(course);

          newCourse.save((err, data) => {
            if (err) {
              next(new ErrorHandler(500, "Internal server error", err.message));
            }

            const info2 = {
              success: "Course added succesfully!",
              course: data,
            };

            return res.status(200).json(info2);
          });
        }
      })
      .catch((err) => {
        if (err) {
          next(new ErrorHandler(500, "Internal server error", err.message));
        }
      });
  }
});

router.put("/update/:id", isLoggedIn, (req, res, next) => {
  const id = req.params.id;

  const {
    title,
    imagePath,
    price,
    author,
    amount,
    description,
    averageRate,
    dateMilliseconds,
    dateString,
  } = req.body;

  let info = {
    success: "",
    course: {},
  };

  Course.findById(id)
    .then((course) => {
      if (course) {
        course.title = title;
        course.imagePath = imagePath;
        course.price = price;
        course.author = author;
        course.amount = amount;
        course.description = description;
        course.averageRate = averageRate;
        course.dateMilliseconds = dateMilliseconds;
        course.dateString = dateString;

        info.success = "Course updated succesfully";

        course.save().then((response) => {
          info.course = response;
          return res.status(200).json(info);
        });
      }
    })
    .catch((err) => {
      if (err) {
        next(new ErrorHandler(500, "Internal server error", err.message));
      }
    });
});

router.put("/update-courses", isLoggedIn, (req, res, next) => {
  const { _id, amount } = req.body;

  Course.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        amount: amount,
      },
    },
    {
      new: true,
    }
  )
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      if (err) {
        next(new ErrorHandler(500, "Internal server error", err.message));
      }
    });
});

router.delete("/delete/:id", isLoggedInAdmin, (req, res, next) => {
  const id = req.params.id;

  Course.findByIdAndDelete({ _id: id })
    .then((response) => {
      const info = {
        success: "Course removed succesfully!",
      };
      return res.status(200).json(info);
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

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
