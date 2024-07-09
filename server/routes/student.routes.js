const express = require("express");
const {
  studentLogin,
  studentLogout,
  viewAttendance,
  viewResult,
  submitFeedbacks,
  loadCurrentStudent,
  createReceipt,
  getReceipts,
  createStudent
} = require("../controllers/student.controllers");
const multipleUpload = require("../middlewares/imageUpload.middlewares");

const isStudentAuthenticated = require("../middlewares/isStudentAuthenticated.middlewares");
const Router = express.Router();

Router.route("/login").post(studentLogin);
Router.route("/admissionsubmit").post(multipleUpload,createStudent);
Router.route("/logout").get(isStudentAuthenticated, studentLogout);
Router.route("/view-attendance/:time_range").get(
  isStudentAuthenticated,
  viewAttendance
);
Router.route("/view-result/:student_id").get(
  isStudentAuthenticated,
  viewResult
);
Router.route("/submit-feedback/:course_id").post(
  isStudentAuthenticated,
  submitFeedbacks
);


Router.route("/load-current-student").get(
  isStudentAuthenticated,
  loadCurrentStudent
);
Router.route("/receipts").post(
  isStudentAuthenticated,
  createReceipt
);
Router.route("/get_receipts").get(
  isStudentAuthenticated,
    getReceipts
);



module.exports = Router;
