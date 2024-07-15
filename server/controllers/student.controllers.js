const { STATUS_CODES } = require("http");
const cloudinary = require("cloudinary");
const AdmissionModel = require("../models/admission.models");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const getImageUri = require("../config/imageURI.config");

const studentModel = require("../models/student.models");
const attendanceModel = require("../models/attendance.models");
const resultModel = require("../models/result.models");
const feedbackResponseModel = require("../models/feedbackResponse.models");
const teacherModel = require("../models/teacher.models");
const feedbackModel = require("../models/feedback.models");
const Receipt = require('../models/receipt.model');

const gradeModel = require("../models/grade.models");
const {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} = require("date-fns");
const courseModel = require("../models/course.models");
exports.studentLogin = async (req, res) => {
  try {
    const { studentEmail, studentPassword } = req.body;
    if (!studentEmail) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Student Email parameter is missing!",
      });
    }
    if (!studentPassword) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Student Password parameter is missing!",
      });
    }
    const isStudentEmailExisted = await studentModel.findOne({ studentEmail });
    if (!isStudentEmailExisted) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: `Incorrect email address!`,
      });
    }
    const comparedPassword = await bcrypt.compare(
      studentPassword,
      isStudentEmailExisted.studentPassword
    );
    if (!comparedPassword) {
      return res.status(401).json({
        statusCode: STATUS_CODES[401],
        message: "Incorrect password!",
      });
    }
//     const studentToken = await jwt.sign(
//       { _id: isStudentEmailExisted._id },
//       process.env.STUDENT_SECRET_TOKEN
//     );
//     const options = {
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 24 * 20,
//       secure: true,
//       sameSite: "Strict",
//     };
//     res.cookie("studentToken", studentToken, options);
//     return res.status(200).json({
//       statusCode: STATUS_CODES[200],
//       message: "You logged in successfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       statusCode: STATUS_CODES[500],
//       message: error.message,
//     });
//   }
// };


jwt.sign({ _id: isStudentEmailExisted._id }, process.env.STUDENT_SECRET_TOKEN, {}, (err, token) => {
  if (err) {
    // Added error handling for JWT generation
    return res.status(500).json({
      statusCode: 500,
      message: "Token generation failed",
    });
  }
  // Ensure single response after setting the cookie
  res.cookie('studentToken', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
    secure: true,
    sameSite: 'none',
  }).status(200).json({
    statusCode: 200,
    message: "You logged in successfully",
    id: isStudentEmailExisted._id,
  });
});
} catch (error) {
return res.status(500).json({
  statusCode: 500,
  message: error.message,
});
}
};

exports.createReceipt = async (req, res) => {
  const { name, class: studentClass, fee, cnic, paymentMethod } = req.body;
  const newReceipt = new Receipt({ name, class: studentClass, fee, cnic, paymentMethod });
  try {
    await newReceipt.save();
    res.status(201).send(newReceipt);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getReceipts = async (req, res) => {
  try {
    const receipts = await Receipt.find();
    res.status(200).send(receipts);
  } catch (error) {
    res.status(400).send(error);
  }
};







exports.studentLogout = async (req, res) => {
  try {
    res.clearCookie("studentToken");
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

exports.viewAttendance = async (req, res) => {
  try {
    const studentId = req?.currentStudent?._id;
    if (!studentId) {
      res.clearCookie("studentToken");
      return res.status(401).json({
        statusCode: STATUS_CODES[401],
        message: "Please login",
      });
    }

    // Get the desired time range from req.query
    const period = req.params.time_range;
    let startDate, endDate;

    // Determine the start and end dates based on the period
    switch (period) {
      case "weekly":
        startDate = startOfWeek(new Date());
        endDate = endOfWeek(new Date());
        break;
      case "monthly":
        startDate = startOfMonth(new Date());
        endDate = endOfMonth(new Date());
        break;
      case "yearly":
        startDate = startOfYear(new Date());
        endDate = endOfYear(new Date());
        break;
      default:
        return res.status(400).json({
          statusCode: STATUS_CODES[400],
          message:
            "Invalid period. Please specify 'weekly', 'monthly', or 'yearly'.",
        });
    }

    // Fetch attendance data for the specific student within the specified time range
    const studentAttendance = await attendanceModel.find({
      "attendanceStudents.studentId": studentId,
      attendanceDate: { $gte: startDate, $lte: endDate },
    });

    if (!studentAttendance || studentAttendance.length === 0) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: `No attendance records found for the student with id: ${studentId} within the specified period.`,
      });
    }

    const attendanceData = studentAttendance
      .map((attendance) => {
        const studentData1 = attendance.attendanceStudents.find(
          (item) =>
            item?.studentId.toString() === req?.currentStudent?._id.toString()
        );
        return studentData1;
      })
      .filter(Boolean);

    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      studentAttendance,
      attendanceData,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.viewResult = async (req, res) => {
  try {
    const studentId = req?.params?.student_id;
    if (!studentId) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Student Id parameter is missing",
      });
    }
    const studentResults = await resultModel
      .find({ studentId })
      .populate({ path: "testId", populate: { path: "testCourseId" } });
    if (!studentResults || studentResults.length === 0) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "No result matches with student id of: " + studentId,
      });
    }
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      studentResults,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.submitFeedbacks = async (req, res) => {
  try {
    const studentId = req?.currentStudent?._id;
    const courseId = req?.params?.course_id;
    const { feedbackMessage } = req.body;
    if (!studentId) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Student id parameter is missing",
      });
    }
    if (!courseId) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Course Id is missing",
      });
    }
    if (!feedbackMessage) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Feedback message field is missing",
      });
    }
    const course = await courseModel.findOne({ _id: courseId });
    if (!course) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "course is not found in database with id: " + courseId,
      });
    }
    const newFeedback = await new feedbackModel({
      courseId,
      studentId,
      feedbackMessage,
    }).save();
    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      message: "Your feedback is recorded successfully!",
      newFeedback,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

exports.loadCurrentStudent = async (req, res) => {
  try {
    if (!req?.currentStudent) {
      return res.status(401).json({
        statusCode: STATUS_CODES[401],
        message: "Please login",
      });
    }
    const currentStudent = await studentModel
      .findOne({
        _id: req?.currentStudent,
      })
      .populate({
        path: "studentGrade",
      })
      .populate({
        path: "studentCourses",
        populate: {
          path: "courseId",
          populate: {
            path: "courseTeacher",
          },
        },
      })
      .populate({
        path: "studentResults",
        populate: { path: "courseId", model: courseModel },
      });

    return res.status(200).json({
      statusCode: STATUS_CODES[200],
      currentStudent,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

// exports.viewStudentCourses = async (req, res) => {
//   try {
//     const studentId = req?.currentStudent?._id;
//     if (!studentId) {
//       return res.status(404).json({
//         statusCode: STATUS_CODES[401],
//         message: "Please login!",
//       });
//     }
//     const student = await studentModel.findOne({ _id: studentId });
//     if (!student) {
//       return res.status(404).json({
//         statusCode: STATUS_CODES[404],
//         message: "Student not found in database!",
//       });
//     }
//   } catch (error) {
//     res.status(500).json({
//       statusCode: STATUS_CODES[500],
//       message: error.message,
//     });
//   }
// };
exports.createStudent = async (req, res) => {
  try {
    const files = req.files || [];
    
    if (!req.body) {
      return res.status(404).json({
        statusCode: 404,
        message: "Req Body is empty or null",
      });
    }

    const { 
      studentName, studentEmail, studentPhone, studentDOB, 
      studentAddress, guardianName, guardianPhone, studentClass, 
      adminId, paymentMethod 
    } = req.body;

    let studentIdPhoto = null;
    let lastDegree = null;
    let paymentSlip = null;

    if (files["studentIdPhoto"] && files["studentIdPhoto"].length > 0) {
      studentIdPhoto = files["studentIdPhoto"][0];
    }
    if (files["lastDegree"] && files["lastDegree"].length > 0) {
      lastDegree = files["lastDegree"][0];
    }
    if (files["paymentSlip"] && files["paymentSlip"].length > 0) {
      paymentSlip = files["paymentSlip"][0];
    }
    if (studentIdPhoto) {
      const studentIdPhotoURI = getImageUri(studentIdPhoto);
      const studentIdPhotoUpload = await cloudinary.uploader.upload(
        studentIdPhotoURI.content
      );
      studentIdPhoto = studentIdPhotoUpload.url;
    }

    if (lastDegree) {
      const lastDegreeURI = getImageUri(lastDegree);
      const lastDegreeUpload = await cloudinary.uploader.upload(
        lastDegreeURI.content
      );
      lastDegree = lastDegreeUpload.url;
    }

    if (paymentMethod === "online" && paymentSlip) {
      const paymentSlipURI = getImageUri(paymentSlip);
      const paymentSlipUpload = await cloudinary.uploader.upload(
        paymentSlipURI.content
      );
      paymentSlip = paymentSlipUpload.url;
    }

    const student = await AdmissionModel.create({
      studentName,
      studentEmail,
      studentPhone,
      studentDOB,
      studentAddress,
      guardianName,
      guardianPhone,
      studentClass,
      studentIdPhoto,
      lastDegree,
      adminId,
      paymentMethod,
      paymentSlip,
      submissionDate: new Date()
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Admission Form Submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: error.message,
    });
  }
};
