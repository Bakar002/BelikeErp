const mongoose = require("mongoose");

const gradeSchema = mongoose.Schema(
  {
    gradeCategory: {
      type: String,
      required: [true, "Grade Category is required"],
    },
    gradeCourses: [
      {
        gradeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      },
    ],
    gradeResults: [
      {
        resultId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Result",
        },
      },
    ],
    gradeRoomNumber: String,
    gradeSchoolTiming: String,
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

gradeSchema.index({ adminId: 1, gradeCategory: 1 }, { unique: true });

const gradeModel = mongoose.model("Grade", gradeSchema);

module.exports = gradeModel;
