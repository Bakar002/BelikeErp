const jwt = require("jsonwebtoken");
const { STATUS_CODES } = require("http");
const adminModel = require("../models/admin.models");
const isAdminAuthenticated = async (req, res, next) => {
  try {
    const { adminToken } = req.cookies;
    if (!adminToken) {
      return res.status(401).json({
        statusCode: STATUS_CODES[401],
        message: "Please login first!",
      });
    }
    const comparedToken = await jwt.verify(
      adminToken,
      process.env.ADMIN_SECRET_TOKEN
    );
    if (!comparedToken) {
      return res.status(401).json({
        statusCode: STATUS_CODES[401],
        messsage: "You are an unauthorized, please login again!",
      });
    }
    const admin = await adminModel.findById({ _id: comparedToken._id });
    if (!admin) {
      res.clearCookie("adminToken");
      return res.status(404).json({
        statusCode: STATUS_CODES[404],
        message: "Admin not found in database, please register yourself",
      });
    }
    if (!comparedToken) {
      return res.status(401).json({
        statusCode: STATUS_CODES[401],
        message: "You're unauthorized, Please login again!",
      });
    }
    if (admin) {
      req.currentAdmin = admin;
    }
    next();
  } catch (error) {
    return res.status(501).json({
      statusCode: STATUS_CODES[501],
      message: error.message,
    });
  }
};

module.exports = isAdminAuthenticated;
