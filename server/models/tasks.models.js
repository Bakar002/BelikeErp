// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    teacherName: { type: String, required: true },
    course: { type: String, required: true },
    grade: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    time: { type: Date, required: true },
    submissionDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);
