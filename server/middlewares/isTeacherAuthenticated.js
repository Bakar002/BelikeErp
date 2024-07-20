const jwt = require("jsonwebtoken");
const { STATUS_CODES } = require("http");
const teacherModel = require("../models/teacher.models");
const isTeacherAuthenticated = async (req, res, next) => {
  try {
    const { teacherToken } = req.cookies;
    if (!teacherToken) {
      return res.status(401).json({
        statusCode: STATUS_CODES[401],
        message: "Please login first!",
      });
    }
    const comparedToken = await jwt.verify(
      teacherToken,
      process.env.TEACHER_SECRET_TOKEN
    );
    const teacher = await teacherModel.findById({ _id: comparedToken._id });
    if (!teacher) {
      res.clearCookie("teacherToken");
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message:
          "Teacher not found in database, please ask admin to register yourself",
      });
    }
    if (!comparedToken) {
      return res.status(401).json({
        statusCode: STATUS_CODES[401],
        message: "You're unauthorized, Please login again!",
      });
    }
    if (teacher) {
      req.currentTeacher = teacher;
    }
    next();
  } catch (error) {
    return res.status(501).json({
      statusCode: STATUS_CODES[501],
      message: error.message,
    });
  }
};


module.exports = isTeacherAuthenticated;
