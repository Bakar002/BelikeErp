const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    courseTitle: {
      type: String,
      required: [true, "Course Title is required"],
    },
    courseTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    courseGrade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
    },
    courseTimeTable: String,
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

courseSchema.index({ adminId: 1, courseTitle: 1 }, { unique: true });

const courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;
