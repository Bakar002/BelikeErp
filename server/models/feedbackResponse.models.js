const mongoose = require("mongoose");

const feedbackResponseSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    feedbackId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
      required: true,
    },
    responses: [
      {
        option: String,
      },
    ],
  },
  { timestamps: true }
);

const feedbackResponseModel = mongoose.model(
  "FeedbackResponse",
  feedbackResponseSchema
);

module.exports = feedbackResponseModel;
