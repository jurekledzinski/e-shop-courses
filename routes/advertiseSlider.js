const express = require("express");
const router = express.Router();

const { roleAdmin } = require("../configs/config");
const Advertise = require("../models/advertiseSlider.model");

const { ErrorHandler } = require("../errors/error");

router.get("/", (req, res, next) => {
  Advertise.find({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.post("/", isLoggedInAdmin, (req, res, next) => {
  const {
    colorDescription,
    colorTitle,
    description,
    imagePath,
    title,
  } = req.body;
  let info = {
    success: "",
    advert: {},
  };

  const advertiseImgSlider = {
    title,
    description,
    imagePath,
    colorDescription,
    colorTitle,
  };

  const newAdvertise = new Advertise(advertiseImgSlider);

  newAdvertise
    .save()
    .then((response) => {
      if (response) {
        info.success = "Advertise created successfully";
        info.advert = response;
        return res.status(200).json(info);
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
});

router.delete("/:id", isLoggedInAdmin, (req, res, next) => {
  const id = req.params.id;

  const info1 = {
    success: "",
  };

  Advertise.findByIdAndDelete({ _id: id }, (err, data) => {
    if (err) {
      next(new ErrorHandler(500, "Internal server error", err.message));
    }

    if (data) {
      info1.success = "Advert removed successfully";
      return res.status(200).json(info1);
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
