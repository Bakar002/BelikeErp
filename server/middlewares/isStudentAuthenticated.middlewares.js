const { STATUS_CODES } = require("http");
const jwt = require("jsonwebtoken");
const studentModel = require("../models/student.models");
require("dotenv").config();
const isStudentAuthenticated = async (req, res, next) => {
  try {
    const studentToken = req?.cookies?.studentToken;
    if (!studentToken) {
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Please login first",
      });
    }
    const comparedToken = await jwt.verify(
      studentToken,
      process.env.STUDENT_SECRET_TOKEN
    );
    if (!comparedToken) {
      return res.status(401).json({
        statusCode: STATUS_CODES[401],
        messsage:
          "You are an unauthorized student, please verify your identity or login again!",
      });
    }
    const student = await studentModel.findOne({ _id: comparedToken?._id });
    if (!student) {
      res.clearCookie("studentToken");
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message:
          "Student not found in database, please ask admin to register yourself",
      });
    }
    req.currentStudent = student;
    next();
  } catch (error) {
    return res.status(500).json({
      statusCode: STATUS_CODES[500],
      message: error.message,
    });
  }
};

module.exports = isStudentAuthenticated;
