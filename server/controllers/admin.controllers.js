const adminModel = require("../models/admin.models");
const { STATUS_CODES } = require("http");
const cloudinary = require("cloudinary");
const getImageUri = require("../config/imageURI.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentModel = require("../models/student.models");
const teacherModel = require("../models/teacher.models");
const gradeModel = require("../models/grade.models");
const courseModel = require("../models/course.models");
const feedbackModel = require("../models/feedback.models");
const resultModel = require("../models/result.models");
const attendanceModel = require("../models/attendance.models");
require("dotenv").config();
exports.createAdmin = async (req, res) => {
  try {
    const files = req.files;
    if (!req.body) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Req Body is empty or null",
      });
    }
    const { adminName, adminEmail, adminPassword } = req.body;
    const adminEmailExists = await adminModel.findOne({ adminEmail });
    if (adminEmailExists) {
      return res.status(409).json({
        statusCode: STATUS_CODES[409],
        message: `${adminEmail} is already registered`,
      });
    }
    let image = files[0];
    if (image.length > 0) {
      image = image[0];
    }
    const imageURI = getImageUri(image);
    const imageUpload = await cloudinary.v2.uploader.upload(imageURI.content);
    const adminAvatar = imageUpload.url;
    await adminModel.create({
      adminName,
      adminEmail,
      adminPassword,
      adminAvatar: adminAvatar || "null",
    });
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      message: "Admin is created successfully",
    });
  } catch (error) {
    res.status(500).json({
      errorStatusCode: STATUS_CODES[500],
      errorMessage: error.message,
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { adminEmail, adminPassword } = req.body;
    if (!adminEmail || !adminPassword) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "adminEmail or adminPassword is missing",
      });
    }
    const isEmailExisted = await adminModel
      .findOne({ adminEmail })
      .select("+adminPassword");
    if (!isEmailExisted) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: `${adminEmail} is not existed in database`,
      });
    }
    const isPasswordMatched = await bcrypt.compare(
      adminPassword,
      isEmailExisted.adminPassword
    );
    if (!isPasswordMatched) {
      return res.status(401).json({
        statusCode: STATUS_CODES[401],
        message: `Password is incorrect`,
      });
    }
    const adminToken = await jwt.sign(
      { _id: isEmailExisted._id },
      process.env.ADMIN_SECRET_TOKEN
    );
    const options = {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
      secure: true,
      sameSite: "Strict",
    };
    res.cookie("adminToken", adminToken, options);
    res.status(200).json({
      statusCode: STATUS_CODES[200],
      message: "You logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.addStudent = async (req, res) => {
  try {
    let files = req.files;
    const studentGrade = req?.params?.grade_id;
    const {
      studentName,
      studentEmail,
      studentPassword,
      studentId,
      studentIdCardNumber,
      studentCourses,
    } = req.body;
    if (!studentName) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Student Name is missing",
      });
    }
    if (!studentEmail) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Student Email is missing",
      });
    }
    if (!studentPassword) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Student Password is missing ",
      });
    }
    if (!studentId) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Student Id is missing",
      });
    }
    if (!studentGrade) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Student Grade is missing",
      });
    }
    if (!studentCourses || studentCourses.length === 0) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Student Courses are missing",
      });
    }
    const isStudentEmailExisted = await studentModel.findOne({ studentEmail });
    const isStudentIdCardExisted = await studentModel.findOne({
      studentIdCardNumber,
    });
    if (isStudentEmailExisted) {
      return res.status(409).json({
        statusCode: STATUS_CODES[409],
        message:
          "Student Email is already existed into database, please add unqiue email",
      });
    }
    if (isStudentIdCardExisted) {
      return res.status(409).json({
        statusCode: STATUS_CODES[409],
        message:
          "Student Id Card Number is already existed into database, please add unqiue studend id card",
      });
    }
    let studentAvatar = null;
    let studentIdCardCopy = null;
    if (files["studentAvatar"] && files["studentAvatar"].length > 0) {
      studentAvatar = files["studentAvatar"][0];
    }
    if (files["studentIdCardCopy"] && files["studentIdCardCopy"].length > 0) {
      studentIdCardCopy = files["studentIdCardCopy"][0];
    }
    if (studentAvatar) {
      const studentAvatarURI = getImageUri(studentAvatar);
      const studentAvatarUpload = await cloudinary.uploader.upload(
        studentAvatarURI.content
      );
      studentAvatar = studentAvatarUpload.url;
    }
    if (studentIdCardCopy) {
      const studentIdCardCopyURI = getImageUri(studentIdCardCopy);
      const studentIdCardCopyUpload = await cloudinary.uploader.upload(
        studentIdCardCopyURI.content
      );
      studentIdCardCopy = studentIdCardCopyUpload.url;
    }
    let newStudent = await new studentModel({
      studentName,
      studentEmail,
      studentPassword,
      studentId,
      studentGrade,
      studentCourses,
      studentIdCardNumber: studentIdCardNumber || "",
      studentAvatar: studentAvatar || "",
      studentIdCardCopy: studentIdCardCopy || "",
    }).save();
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      message: `${newStudent.studentName} is added successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.addTeacher = async (req, res) => {
  try {
    let {
      teacherName,
      teacherEmail,
      teacherPassword,
      teacherSalary,
      teacherIdCardNumber,
      teacherJobDate,
      teacherCourses,
      teacherGrades,
    } = req.body;
    let files = req.files;
    if (
      !teacherName ||
      !teacherEmail ||
      !teacherPassword ||
      !teacherIdCardNumber ||
      !teacherSalary
    ) {
      return res.status(400).json({
        statusCode: STATUS_CODES[400],
        message: "One or more required fields are missing",
      });
    }
    const isTeacherEmailExisted = await teacherModel.findOne({ teacherEmail });
    if (isTeacherEmailExisted) {
      return res.status(409).json({
        statusCode: STATUS_CODES[409],
        message: "Teacher email already exists",
      });
    }
    const isTeacherIdCardNumberExisted = await teacherModel.findOne({
      teacherIdCardNumber,
    });
    if (isTeacherIdCardNumberExisted) {
      return res.status(409).json({
        statusCode: STATUS_CODES[409],
        message: "Teacher ID card number already exists",
      });
    }
    let teacherAvatar = null;
    let teacherIdCardCopy = null;
    if (files["teacherAvatar"] && files["teacherAvatar"].length > 0) {
      teacherAvatar = files["teacherAvatar"][0];
    }
    if (files["teacherIdCardCopy"] && files["teacherIdCardCopy"].length > 0) {
      teacherIdCardCopy = files["teacherIdCardCopy"][0];
    }
    if (teacherAvatar) {
      const teacherAvatarURI = getImageUri(teacherAvatar);
      const teacherAvatarUpload = await cloudinary.uploader.upload(
        teacherAvatarURI.content
      );
      teacherAvatar = teacherAvatarUpload.url;
    }
    if (teacherIdCardCopy) {
      const teacherIdCardCopyURI = getImageUri(teacherIdCardCopy);
      const teacherIdCardCopyUpload = await cloudinary.uploader.upload(
        teacherIdCardCopyURI.content
      );
      teacherIdCardCopy = teacherIdCardCopyUpload.url;
    }
    const newTeacher = await teacherModel.create({
      teacherName,
      teacherEmail,
      teacherPassword,
      teacherIdCardNumber,
      teacherSalary,
      teacherAvatar,
      teacherIdCardCopy,
      teacherCourses,
      teacherGrades,
      teacherJobDate,
    });
    return res.status(201).json({
      statusCode: STATUS_CODES[201],
      message: `${newTeacher.teacherName} added successfully`,
      data: newTeacher,
    });
  } catch (error) {
    console.error("Error adding teacher:", error);
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};
exports.addTeacherCourses = async (req, res) => {
  try {
    const teacherId = req?.params?.teacher_id;
    const { teacherCourses } = req?.body;
    if (!teacherId) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Teacher id is missing",
      });
    }
    if (!teacherCourses || teacherCourses.length === 0) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Teacher courses are missing",
      });
    }
    const teacher = await teacherModel.findOne({ _id: teacherId });
    if (!teacher) {
      return res.status(401).json({
        statusCode: STATUS_CODES[404],
        message: "Teacher not found with id: " + teacherId,
      });
    }
    teacherCourses.map((course) => {
      teacher.teacherCourses.push(course);
    });
    await teacher.save();
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      teacher,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};
exports.addTeacherGrades = async (req, res) => {
  try {
    const teacherId = req?.params?.teacher_id;
    const { teacherGrades } = req?.body;
    if (!teacherId) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Teacher id is missing",
      });
    }
    if (!teacherGrades || teacherGrades.length === 0) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Teacher grades are missing",
      });
    }
    const teacher = await teacherModel.findOne({ _id: teacherId });
    if (!teacher) {
      return res.status(401).json({
        statusCode: STATUS_CODES[404],
        message: "Teacher not found with id: " + teacherId,
      });
    }
    teacherGrades.map((grade) => {
      teacher.teacherGrades.push(grade);
    });
    await teacher.save();
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      teacher,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};
exports.addGrade = async (req, res) => {
  try {
    let {
      gradeCategory,
      gradeRoomNumber,
      gradeCourses,
      gradeSchoolTiming,
      gradeIncharge,
    } = req.body;
    if (!gradeCategory) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Grade Category is missing",
      });
    }
    if (!gradeRoomNumber) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Grade Room Number is missing",
      });
    }
    if (!gradeCourses) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Grade Courses are missing",
      });
    }
    if (!gradeIncharge) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Grade Incharge is missing",
      });
    }
    if (!gradeSchoolTiming) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Grade School Timing is missing",
      });
    }
    const isTeacherForInchargeExisted = await teacherModel.findOne({
      _id: gradeIncharge,
    });
    if (!isTeacherForInchargeExisted) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message:
          "Teacher is not existing into database to be the Grade Incharge",
      });
    }
    if (isTeacherForInchargeExisted.teacherGradeIncharge) {
      return res.status(409).json({
        statusCode: STATUS_CODES[409],
        message: `${isTeacherForInchargeExisted.teacherName} is already a grade incharge, please chose another one`,
      });
    }
    const isGradeCategoryExisted = await gradeModel.findOne({ gradeCategory });
    if (isGradeCategoryExisted) {
      return res.status(409).json({
        statusCode: STATUS_CODES[409],
        message: "Grade Category must be unique",
      });
    }
    const newGrade = await new gradeModel({
      gradeCategory,
      gradeRoomNumber,
      gradeSchoolTiming,
      gradeCourses,
      gradeIncharge,
    }).save();
    isTeacherForInchargeExisted.teacherGradeIncharge = newGrade?._id;
    await isTeacherForInchargeExisted.save();
    return res.status(201).json({
      statusCode: STATUS_CODES[201],
      message: `${newGrade.gradeCategory} is added successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.addCourse = async (req, res) => {
  try {
    const { courseTitle, courseTimeTable } = req.body;
    const courseTeacher = req?.params?.teacher_id;
    if (!courseTeacher) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Teacher Id is missing!",
      });
    }
    if (!courseTitle) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Course Title is missing",
      });
    }
    const isCourseTitleExisted = await courseModel.findOne({ courseTitle });
    if (isCourseTitleExisted) {
      return res.status(409).json({
        statusCode: STATUS_CODES[409],
        message: "Course Title must be unique",
      });
    }
    const isCourseTeacherExisted = await teacherModel.findOne({
      _id: courseTeacher,
    });
    if (!isCourseTeacherExisted) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Course Teacher not existed into database",
      });
    }
    const newCourse = await new courseModel({
      courseTitle,
      courseTimeTable: courseTimeTable || "",
      courseTeacher,
    }).save();
    isCourseTeacherExisted.teacherCourses.push(newCourse._id);
    await isCourseTeacherExisted.save();
    return res.status(201).json({
      statusCode: STATUS_CODES[201],
      message: `Course with title ${newCourse.courseTitle} is added successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.loadAllStudents = async (req, res) => {
  try {
    const students = await studentModel.find();
    if (students.length === 0) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "No student existed into database",
      });
    }
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      students,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};
exports.loadAllTeachers = async (req, res) => {
  try {
    const teachers = await teacherModel.find();
    if (teachers.length === 0) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "No teacher existed into database",
      });
    }
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      teachers,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.loadCurrentAdmin = async (req, res) => {
  try {
    const adminId = req?.currentAdmin?._id;
    const isCurrentAdminExisted = await adminModel.findOne({ _id: adminId });
    if (!isCurrentAdminExisted) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Current Admin not existed into database, please login again!",
      });
    }
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      admin: isCurrentAdminExisted,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.adminLogout = async (req, res) => {
  try {
    const adminToken = req.cookies.adminToken;
    if (!adminToken) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Please login first",
      });
    }
    res.clearCookie("adminToken");
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      message: "You logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.viewGradeResult = async (req, res) => {
  try {
    const gradeId = req?.params?.grade_id;
    if (!gradeId) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Grade Id parameter is missing",
      });
    }
    let gradeResult = await resultModel
      .find({ gradeId })
      .populate("studentId")
      .populate("testId");
    if (gradeResult.length === 0 || !gradeResult) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "The is no result for this grade in database",
      });
    }
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      gradeResult,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.viewGradeAttendance = async (req, res) => {
  try {
    const gradeId = req?.params?.grade_id;
    if (!gradeId) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Grade Id parameter is missing, please add it",
      });
    }
    const gradeStudentsAttendance = await attendanceModel
      .find({ gradeId })
      .populate("attendanceStudents.studentId");
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      gradeStudentsAttendance,
    });
  } catch (error) {
    res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.loadAllGrades = async (req, res) => {
  try {
    const grades = await gradeModel.find();
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      grades,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.loadAllCourses = async (req, res) => {
  try {
    const courses = await courseModel.find();
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.loadAllStudents = async (req, res) => {
  try {
    const students = await studentModel.find();
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      students,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.loadAllCoursesFeedbacks = async (req, res) => {
  try {
    const coursesFeedbacks = await feedbackModel
      .find()
      .populate("studentId")
      .populate("courseId")
      .populate({
        path: "courseId",
        populate: { path: "courseTeacher", model: teacherModel },
      });
    res.status(200).json({
      statusCode: STATUS_CODES[200],
      coursesFeedbacks,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};
