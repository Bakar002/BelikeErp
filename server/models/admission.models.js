const mongoose = require("mongoose");

const AdmissionSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,

  },
  studentPhone: {
    type: String,
    required: true,
  },
  studentDOB: {
    type: Date,

  },
  studentAddress: {
    type: String,

  },
  guardianName: {
    type: String,
    required: true,
  },
  guardianPhone: {
    type: String,
    required: true,
  },
  studentClass: {
    type: String,
    required: true,
  },
  studentIdPhoto: {
    type: String,
    required: true,
  },
  lastDegree: {
    type: String,
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentSlip: {
    type: String,
    default: null,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
});

const AdmissionModel = mongoose.model("Admission", AdmissionSchema);
module.exports = AdmissionModel;
