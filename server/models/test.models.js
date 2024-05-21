const mongoose = require("mongoose");

const testSchema = mongoose.Schema(
  {
    testNumber: {
      type: Number,
      default: 0,
      required: [true, "Test number marks are required"],
    },
    gradeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
      required: [true, "Grade id is required"],
    },
    testCourseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Test course id is required"],
    },
    testTotalMarks: {
      type: Number,
      default: 0,
      required: [true, "Test total marks are required"],
    },
    testQuestions: {
      questions: [String],
    },
    testConductedDate: String,
    testTime: String,
  },
  { timestamps: true }
);

const testModel = mongoose.model("Test", testSchema);

module.exports = testModel;
