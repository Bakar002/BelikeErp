const express = require("express");
const {
  createAdmin,
getAllAdmins,
  deleteAdmin,
  updateAdmin,
  adminLogin,
  addStudent,
  addTeacher,
  addGrade,
  addCourse,
  loadAllStudents,
  loadAllTeachers,
  loadCurrentAdmin,
  adminLogout,
  addTeacherCourses,
  addTeacherGrades,
  viewGradeResult,
  viewGradeAttendance,
  loadAllGrades,
  loadAllCourses,
  loadAllCoursesFeedbacks,
  getAdmissionsByAdmin,
  getItStudents,
  createItStudent,
  deleteTeacher,
  updateTeacher,
  deleteStudent
} = require("../controllers/admin.controllers");
const multipleUpload = require("../middlewares/imageUpload.middlewares");
const isAdminAuthenticated = require("../middlewares/isAdminAuthenticated.middlewares");
const Router = express.Router();

Router.route("/createadmin").post(multipleUpload, createAdmin);
// Route to delete an admin by ID
Router.route("/deleteadmin/:adminId").delete(deleteAdmin);

// Route to update an admin by ID
Router.route("/updateadmin/:adminId").put(multipleUpload, updateAdmin);

// Route to get all admins





Router.route("/createItStudent").post(multipleUpload,createItStudent);
Router.route("/getItStudent").get(  isAdminAuthenticated,
getItStudents);
Router.route("/load-all-admins").get(getAllAdmins);
Router.route("/login").post(adminLogin);
Router.route("/add-student/:grade_id").post(
  isAdminAuthenticated,
  multipleUpload,
  addStudent
);
Router.route("/add-teacher").post(
  isAdminAuthenticated,
  multipleUpload,
  addTeacher
);






Router.route("/add-teacher-courses/:teacher_id").post(
  isAdminAuthenticated,
  addTeacherCourses
);
Router.route("/add-teacher-grades/:teacher_id").post(
  isAdminAuthenticated,
  addTeacherGrades
);
Router.route("/add-grade").post(isAdminAuthenticated, addGrade);
Router.route("/add-course").post(isAdminAuthenticated, addCourse);
Router.route("/load-all-students").get(isAdminAuthenticated, loadAllStudents);
Router.route("/load-all-teachers").get(isAdminAuthenticated, loadAllTeachers);
Router.route("/delete-teacher/:teacherId").delete(isAdminAuthenticated, deleteTeacher);

Router.route("/update-teacher/:teacherId").put(isAdminAuthenticated, updateTeacher);



Router.route("/delete-student/:studentId").delete(isAdminAuthenticated, deleteStudent);

Router.route("/load-current-admin").get(isAdminAuthenticated, loadCurrentAdmin);
Router.route("/logout").get(isAdminAuthenticated, adminLogout);
Router.route("/view-grade-result/:grade_id").get(
  isAdminAuthenticated,
  viewGradeResult
);
Router.route("/view-grade-attendance/:grade_id").get(
  isAdminAuthenticated,
  viewGradeAttendance
);
Router.route("/load-all-grades").get(isAdminAuthenticated, loadAllGrades);
Router.route("/load-all-admissions").get(isAdminAuthenticated,getAdmissionsByAdmin );

Router.route("/load-all-students").get(isAdminAuthenticated, loadAllStudents);
 Router.route("/load-all-courses").get(isAdminAuthenticated, loadAllCourses);

Router.route("/load-all-courses-feedbacks").get(
  isAdminAuthenticated,
  loadAllCoursesFeedbacks
);
module.exports = Router;
