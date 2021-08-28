const AdvertOption = require("../models/advertOption.modal");
const { ErrorHandler } = require("../errors/error");

const getAllAdvertOptions = (req, res, next) => {
  AdvertOption.findOne({})
    .then((response) => {
      return res.status(200).json(response);
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
};

const updateAdvertOption = (req, res, next) => {
  const { option, userId } = req.body;

  const info2 = {
    success: "",
    option: "",
  };

  AdvertOption.findOne({ userId: userId })
    .then((response) => {
      if (response) {
        response.name = option;
        response.userId = userId;
        response
          .save()
          .then((response) => {
            info2.success = "Option added successfully";
            info2.option = response.name;
            return res.status(200).json(info2);
          })
          .catch((err) => {
            next(new ErrorHandler(500, "Internal server error", err.message));
          });
      } else {
        const newAdvertOption = new AdvertOption({
          name: option,
          userId: userId,
        });

        newAdvertOption.save((err, data) => {
          if (err) {
            next(new ErrorHandler(500, "Internal server error", err.message));
          }
          info2.success = "Option added successfully";
          info2.option = data.name;
          return res.status(200).json(info2);
        });
      }
    })
    .catch((err) => {
      next(new ErrorHandler(500, "Internal server error", err.message));
    });
};

module.exports = { getAllAdvertOptions, updateAdvertOption };
