const express = require("express");
const {
  teacherLogin,
  loadCurrentTeacher,
  createTest,
  createResult,
  viewGradeResult,
  takeAttendance,
  viewGradeAttendance,
  loadAllStudentOnSameGradeIncharge,
  loadStudentsOfGrade,
  createTask,
} = require("../controllers/teacher.controllers");
const multipleUpload = require("../middlewares/imageUpload.middlewares");

const isTeacherAuthenticated = require("../middlewares/isTeacherAuthenticated");

const Router = express.Router();

Router.route("/login").post(teacherLogin);
Router.route("/load-current-teacher").get(
  isTeacherAuthenticated,
  loadCurrentTeacher
);
Router.route("/create-test/:grade_id/:test_course_id").post(
  isTeacherAuthenticated,
  createTest
);
Router.route("/create-result/:course_id/:student_id/:grade_id").post(
  isTeacherAuthenticated,
  createResult
);
Router.route("/view-grade-result/:grade_id").get(
  isTeacherAuthenticated,
  viewGradeResult
);

Router.route("/take-attendance/:grade_id").post(
  isTeacherAuthenticated,
  takeAttendance
);
Router.route("/view-grade-attendance").get(
  isTeacherAuthenticated,
  viewGradeAttendance
);
Router.route("/load-all-students-same-grade").get(
  isTeacherAuthenticated,
  loadAllStudentOnSameGradeIncharge
);

Router.route("/load-students-with-grade/:grade_id").get(
  isTeacherAuthenticated,
  loadStudentsOfGrade
);

Router.route("/tasks").post(multipleUpload,createTask);



module.exports = Router;
