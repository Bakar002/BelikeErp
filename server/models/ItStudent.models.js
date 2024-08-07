// models/Student.js
const mongoose = require('mongoose');

const ItStudentSchema = new mongoose.Schema({
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    studentPhone: { type: String, required: true },
    studentDOB: { type: Date, required: true },
    studentAddress: { type: String, required: true },
    guardianName: { type: String, required: true },
    guardianPhone: { type: String, required: true },
    studentClass: { type: String, required: true },
    studentIdPhoto: { type: String, required: true },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
    paymentMethod: { type: String, required: true },
    paymentSlip: { type: String },
    submissionDate: { type: Date, default: Date.now },
    course: { type: String, required: true },
    duration: { type: String, required: true }
});

module.exports = mongoose.model('ItStudent', ItStudentSchema);
