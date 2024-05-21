const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    feedbackMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

const feedbackModel = mongoose.model("Feedback", feedbackSchema);

module.exports = feedbackModel;
