const adminModel = require("../models/admin.models");
const { STATUS_CODES } = require("http");
const cloudinary = require("cloudinary");
const getImageUri = require("../config/imageURI.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentModel = require("../models/student.models");
const AdmissionModel = require("../models/admission.models");
const ItStudent = require('../models/ItStudent.models');

const teacherModel = require("../models/teacher.models");
const gradeModel = require("../models/grade.models");
const courseModel = require("../models/course.models");
const feedbackModel = require("../models/feedback.models");
const resultModel = require("../models/result.models");
const attendanceModel = require("../models/attendance.models");
require("dotenv").config();
exports.createAdmin = async (req, res) => {
  try {
    const files = req.files || [];
    
    if (!req.body) {
      return res.status(404).json({
        statusCode: STATUS_CODES.NOT_FOUND,
        message: "Req Body is empty or null",
      });
    }
    
    const { adminName, adminEmail, adminPassword, address, locationLink, contactNumber } = req.body;
    
    // Check if the email is already registered
    const adminEmailExists = await adminModel.findOne({ adminEmail });
    if (adminEmailExists) {
      return res.status(409).json({
        statusCode: STATUS_CODES.CONFLICT,
        message: `${adminEmail} is already registered`,
      });
    }

    let adminAvatar = "null"; // Default value for avatar
    
    // Handle file upload if there are any files
    if (files.length > 0) {
      const image = files[0];
      const imageURI = getImageUri(image); // Ensure this function correctly processes the image
      const imageUpload = await cloudinary.uploader.upload(imageURI.content);
      adminAvatar = imageUpload.url;
    }
    
    // Create the admin with the additional fields
    await adminModel.create({
      adminName,
      adminEmail,
      adminPassword,
      adminAvatar,
      address,
      locationLink,
      contactNumber,
    });
    
    return res.status(200).json({
      statusCode: STATUS_CODES.OK,
      message: "Admin is created successfully",
    });
  } catch (error) {
    res.status(500).json({
      errorStatusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      errorMessage: error.message,
    });
  }
};
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await adminModel.find().select("-adminPassword"); // Exclude password from the result

    if (!admins || admins.length === 0) {
      return res.status(404).json({
        statusCode: STATUS_CODES.NOT_FOUND,
        message: "No admins found",
      });
    }

    return res.status(200).json({
      statusCode: STATUS_CODES.OK,
      message: "Admins retrieved successfully",
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      errorStatusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      errorMessage: error.message,
    });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = await adminModel.findById(adminId);

    if (!admin) {
      return res.status(404).json({
        statusCode: STATUS_CODES.NOT_FOUND,
        message: "Admin not found",
      });
    }

    await adminModel.findByIdAndDelete(adminId);

    return res.status(200).json({
      statusCode: STATUS_CODES.OK,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      errorStatusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      errorMessage: error.message,
    });
  }
};
exports.updateAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const files = req.files;

    if (!req.body) {
      return res.status(400).json({
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: "Request body is empty or null",
      });
    }

    const {
      adminName,
      adminEmail,
      adminPassword,
      address,
      locationLink,
      contactNumber,
    } = req.body;

    let updatedData = {
      adminName,
      adminEmail,
      address,
      locationLink,
      contactNumber,
    };

    // Handle password update if provided
    if (adminPassword) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      updatedData.adminPassword = hashedPassword;
    }

    // Handle file upload for admin avatar
    let adminAvatar = null;
    if (files && files["adminAvatar"] && files["adminAvatar"].length > 0) {
      adminAvatar = files["adminAvatar"][0];
    }

    if (adminAvatar) {
      const adminAvatarURI = getImageUri(adminAvatar); // Ensure this function correctly processes the image
      const adminAvatarUpload = await cloudinary.uploader.upload(adminAvatarURI.content);
      updatedData.adminAvatar = adminAvatarUpload.url;
    }

    const updatedAdmin = await adminModel.findByIdAndUpdate(
      adminId,
      updatedData,
      { new: true, runValidators: true, context: 'query' }
    );

    if (!updatedAdmin) {
      return res.status(404).json({
        statusCode: STATUS_CODES.NOT_FOUND,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      statusCode: STATUS_CODES.OK,
      message: `${updatedAdmin.adminName} updated successfully`,
      data: updatedAdmin,
    });
  } catch (error) {
    console.error("Error updating admin:", error);
    return res.status(500).json({
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

exports.adminLogin = async (req, res) => {
  try {
    const { adminEmail, adminPassword } = req.body;
    
    // Changed from 404 to 400 for missing credentials
    if (!adminEmail || !adminPassword) {
      return res.status(400).json({
        statusCode: 400,
        message: "adminEmail or adminPassword is missing",
      });
    }

    const isEmailExisted = await adminModel.findOne({ adminEmail }).select("+adminPassword");
    if (!isEmailExisted) {
      return res.status(404).json({
        statusCode: 404,
        message: `${adminEmail} is not existed in database`,
      });
    }

    const isPasswordMatched = await bcrypt.compare(adminPassword, isEmailExisted.adminPassword);
    if (!isPasswordMatched) {
      return res.status(401).json({
        statusCode: 401,
        message: "Password is incorrect",
      });
    }

    // JWT token generation and setting the cookie
    jwt.sign({ _id: isEmailExisted._id }, process.env.ADMIN_SECRET_TOKEN, {}, (err, token) => {
      if (err) {
        // Added error handling for JWT generation
        return res.status(500).json({
          statusCode: 500,
          message: "Token generation failed",
        });
      }
      // Ensure single response after setting the cookie
      res.cookie('adminToken', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
        secure: true,
        sameSite: 'none',
      }).status(200).json({
        statusCode: 200,
        message: "You logged in successfully",
        id: isEmailExisted._id,
      });
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
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
        message: "Student Password is missing",
      });
    }
    if (!studentId) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Student Id is missing",
      });
    }
    // if (!studentGrade) {
    //   return res.status(404).json({
    //     statusCode: STATUS_CODES[404],
    //     message: "Student Grade is missing",
    //   });
    // }
    // if (!studentCourses || studentCourses.length === 0) {
    //   return res.status(404).json({
    //     statusCode: STATUS_CODES[404],
    //     message: "Student Courses are missing",
    //   });
    // }

    const isStudentEmailExisted = await studentModel.findOne({ studentEmail });
    const isStudentIdCardExisted = await studentModel.findOne({ studentIdCardNumber });
    if (isStudentEmailExisted) {
      return res.status(409).json({
        statusCode: STATUS_CODES[409],
        message: "Student Email already exists in the database, please add a unique email",
      });
    }
    if (isStudentIdCardExisted) {
      return res.status(409).json({
        statusCode: STATUS_CODES[409],
        message: "Student Id Card Number already exists in the database, please add a unique student id card",
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
      const studentAvatarUpload = await cloudinary.uploader.upload(studentAvatarURI.content);
      studentAvatar = studentAvatarUpload.url;
    }
    if (studentIdCardCopy) {
      const studentIdCardCopyURI = getImageUri(studentIdCardCopy);
      const studentIdCardCopyUpload = await cloudinary.uploader.upload(studentIdCardCopyURI.content);
      studentIdCardCopy = studentIdCardCopyUpload.url;
    }

    let newStudent = await new studentModel({
      adminId: req.currentAdmin._id,  // Add the admin ID here
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
    const adminId = req.currentAdmin._id; // Extract admin ID from the request

    if (
      !teacherName ||
      !teacherEmail ||
      !teacherPassword ||
      !teacherIdCardNumber
    ) {
      return res.status(400).json({
        statusCode: STATUS_CODES[400],
        message: "One or more required fields are missing",
      });
    }

    const isTeacherEmailExisted = await teacherModel.findOne({
      teacherEmail,
      adminId,
    });
    if (isTeacherEmailExisted) {
      return res.status(409).json({
        statusCode: STATUS_CODES[409],
        message: "Teacher email already exists for this admin",
      });
    }

    const isTeacherIdCardNumberExisted = await teacherModel.findOne({
      teacherIdCardNumber,
      adminId,
    });
    if (isTeacherIdCardNumberExisted) {
      return res.status(409).json({
        statusCode: STATUS_CODES[409],
        message: "Teacher ID card number already exists for this admin",
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
      adminId // Include the admin ID in the teacher data
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
    const adminId = req.currentAdmin._id;

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
    const teacher = await teacherModel.findOne({ _id: teacherId, adminId });
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
    const adminId = req.currentAdmin._id;

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
    const teacher = await teacherModel.findOne({ _id: teacherId, adminId });
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
    } = req.body;
    const adminId = req.currentAdmin._id;

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
    if (!gradeSchoolTiming) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Grade School Timing is missing",
      });
    }

    const isGradeCategoryExisted = await gradeModel.findOne({ gradeCategory, adminId });
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
      adminId,
    }).save();

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
    const adminId = req.currentAdmin._id;

    if (!courseTitle) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Course Title is missing",
      });
    }

    const isCourseTitleExisted = await courseModel.findOne({ courseTitle, adminId });
    if (isCourseTitleExisted) {
      return res.status(409).json({
        statusCode: STATUS_CODES[409],
        message: "Course Title must be unique",
      });
    }

    const newCourse = await new courseModel({
      courseTitle,
      courseTimeTable: courseTimeTable || "",
      adminId,
    }).save();

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
    const adminId = req.currentAdmin._id;
    const students = await studentModel.find({ adminId });
    if (students.length === 0) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "No students exist in the database for this admin",
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
    const adminId = req.currentAdmin._id;
    const teachers = await teacherModel.find({ adminId });
    if (teachers.length === 0) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "No teachers exist in the database for this admin",
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

    // Clear the adminToken cookie
    res.clearCookie("adminToken", {
      httpOnly: true, // Ensure this matches how the cookie was originally set
      secure: true, // Use true if the cookie is set over HTTPS
      sameSite: 'none' // Ensure this matches how the cookie was originally set
    });

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
    const adminId = req.currentAdmin._id;
    const grades = await gradeModel.find({ adminId });
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
    const adminId = req.currentAdmin._id;
    const courses = await courseModel.find({ adminId }).populate('courseTeacher').populate('courseGrade');
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
    const adminId = req.currentAdmin._id;
    const students = await studentModel.find({ adminId });
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


// exports.loadAllStudents = async (req, res) => {
//   try {
//     const students = await studentModel.find();
//     return res.status(200).json({
//       statusCode: STATUS_CODES[200],
//       students,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       statusCode: STATUS_CODES[500],
//       message: error.message,
//     });
//   }
// };

exports.loadAllCoursesFeedbacks = async (req, res) => {
  try {
    const adminId = req.currentAdmin._id; // Get the admin ID

    // Find courses that belong to the current admin
    const courses = await courseModel.find({ adminId });
    const courseIds = courses.map(course => course._id);

    // Find feedbacks for the courses that belong to the admin
    const coursesFeedbacks = await feedbackModel
      .find({ courseId: { $in: courseIds } })
      .populate("studentId")
      .populate("courseId")
      .populate({
        path: "courseId",
        populate: { path: "courseTeacher", model: teacherModel },
      });

    if (coursesFeedbacks.length === 0) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "No course feedbacks found for this admin",
      });
    }

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


exports.getAdmissionsByAdmin = async (req, res) => {
  try {
    const adminId = req.currentAdmin._id; // Use authenticated admin ID
    const admissions = await AdmissionModel.find({ adminId });
    res.status(200).json({
      statusCode: 200,
      message: 'Admissions fetched successfully',
      data: admissions,
    });
  } catch (error) {
    console.error('Error in getAdmissionsByAdmin:', error);
    res.status(500).json({
      errorStatusCode: 500,
      errorMessage: error.message,
    });
  }
};





exports.createItStudent = async (req, res) => {
  try {
    const files = req.files || [];

    if (!req.body) {
      return res.status(400).json({
        statusCode: 400,
        message: "Request body is empty or null",
      });
    }

    const { 
      studentName, studentEmail, studentPhone, studentDOB, adminId,
      studentAddress, guardianName, guardianPhone, studentClass, 
      course, duration, paymentMethod 
    } = req.body;

    let studentIdPhoto = null;
    let paymentSlip = null;

    if (files["studentIdPhoto"] && files["studentIdPhoto"].length > 0) {
      studentIdPhoto = files["studentIdPhoto"][0];
    }
    if (files["paymentSlip"] && files["paymentSlip"].length > 0) {
      paymentSlip = files["paymentSlip"][0];
    }

    if (studentIdPhoto) {
      const studentIdPhotoURI = getImageUri(studentIdPhoto);
      const studentIdPhotoUpload = await cloudinary.uploader.upload(studentIdPhotoURI.content);
      studentIdPhoto = studentIdPhotoUpload.url;
    }

    if (paymentMethod === "online" && paymentSlip) {
      const paymentSlipURI = getImageUri(paymentSlip);
      const paymentSlipUpload = await cloudinary.uploader.upload(paymentSlipURI.content);
      paymentSlip = paymentSlipUpload.url;
    }



    const student = await ItStudent.create({
      studentName,
      studentEmail,
      studentPhone,
      studentDOB,
      studentAddress,
      guardianName,
      guardianPhone,
      studentClass,
      course,
      duration,
      studentIdPhoto,
      adminId,
      paymentMethod,
      paymentSlip,
      submissionDate: new Date()
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Admission Form Submitted successfully",
      student // Optionally return the created student object
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};


exports.getItStudents = async (req, res) => {
  try {
    const adminId = req.currentAdmin._id; // Use authenticated admin ID
    const admissions = await ItStudent.find({ adminId });
    res.status(200).json({
      statusCode: 200,
      message: 'Admissions fetched successfully',
      data: admissions,
    });
  } catch (error) {
    console.error('Error in getAdmissionsByAdmin:', error);
    res.status(500).json({
      errorStatusCode: 500,
      errorMessage: error.message,
    });
  }
};






//  Teacher update and delete
exports.deleteTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;




    const teacher = await teacherModel.findOneAndDelete({ _id: teacherId });

    if (!teacher) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Teacher not found",
        data:teacher
      });
    }

    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      message: `${teacher.teacherName} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting teacher:", error);
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};
exports.updateTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const {
      teacherName,
      teacherEmail,
      teacherSalary,
      teacherIdCardNumber,
      teacherJobDate,
      teacherCourses,
      teacherGrades,
    } = req.body;
    const files = req.files;
    const adminId = req.currentAdmin._id; // Extract admin ID from the request

    let teacherAvatar = null;
    let teacherIdCardCopy = null;
    if (files && files["teacherAvatar"] && files["teacherAvatar"].length > 0) {
      teacherAvatar = files["teacherAvatar"][0];
    }
    if (files && files["teacherIdCardCopy"] && files["teacherIdCardCopy"].length > 0) {
      teacherIdCardCopy = files["teacherIdCardCopy"][0];
    }

    if (teacherAvatar) {
      const teacherAvatarURI = getImageUri(teacherAvatar);
      const teacherAvatarUpload = await cloudinary.uploader.upload(teacherAvatarURI.content);
      teacherAvatar = teacherAvatarUpload.url;
    }

    if (teacherIdCardCopy) {
      const teacherIdCardCopyURI = getImageUri(teacherIdCardCopy);
      const teacherIdCardCopyUpload = await cloudinary.uploader.upload(teacherIdCardCopyURI.content);
      teacherIdCardCopy = teacherIdCardCopyUpload.url;
    }

    const updatedTeacher = await teacherModel.findOneAndUpdate(
      { _id: teacherId, adminId },
      {
        teacherName,
        teacherEmail,
        teacherSalary,
        teacherIdCardNumber,
        teacherJobDate,
        teacherCourses,
        teacherGrades,
        ...(teacherAvatar && { teacherAvatar }),
        ...(teacherIdCardCopy && { teacherIdCardCopy }),
      },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Teacher not found",
      });
    }

    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      message: `${updatedTeacher.teacherName} updated successfully`,
      data: updatedTeacher,
    });
  } catch (error) {
    console.error("Error updating teacher:", error);
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};



exports.deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;




    const student = await studentModel.findOneAndDelete({ _id: studentId });

    if (!student) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "STUDENT not found",
        data:teacher
      });
    }

    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      message: `${student.studentName} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};