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
  },
  { timestamps: true }
);

const courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;
