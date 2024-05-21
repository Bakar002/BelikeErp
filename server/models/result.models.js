const mongoose = require("mongoose");

const resultSchema = mongoose.Schema(
  {
    gradeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    resultTotalMarks: {
      type: Number,
    },
    resultObtainedNumber: {
      type: Number,
      default: 0,
    },
    testName: {
      type: String,
    },
    resultStatus: {
      type: Boolean,
      default: false,
    },
    resultPercentage: {
      type: String,
    },
  },
  { timestamps: true }
);

const resultModel = mongoose.model("Result", resultSchema);

module.exports = resultModel;
