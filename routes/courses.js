const express = require("express");
const router = express.Router();

const { isLoggedInAdmin, isLoggedIn } = require("../middlewares/middlewares");

const {
  addNewCourse,
  deleteCourse,
  getAllCourses,
  updateCourseById,
  updateCourse,
} = require("../controllers/coursesControl");

router.get("/", getAllCourses);

router.post("/add-new", isLoggedInAdmin, addNewCourse);

router.put("/update/:id", isLoggedIn, updateCourseById);

router.put("/update-courses", isLoggedIn, updateCourse);

router.delete("/delete/:id", isLoggedInAdmin, deleteCourse);

module.exports = router;
