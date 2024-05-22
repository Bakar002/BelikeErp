const { STATUS_CODES } = require("http");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const studentModel = require("../models/student.models");
const attendanceModel = require("../models/attendance.models");
const resultModel = require("../models/result.models");
const feedbackResponseModel = require("../models/feedbackResponse.models");
const teacherModel = require("../models/teacher.models");
const feedbackModel = require("../models/feedback.models");
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
    const studentToken = await jwt.sign(
      { _id: isStudentEmailExisted._id },
      process.env.STUDENT_SECRET_TOKEN
    );
    const options = {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 20,
      secure: true,
      sameSite: "Strict",
    };
    res.cookie("studentToken", studentToken, options);
    return res.status(200).json({
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
