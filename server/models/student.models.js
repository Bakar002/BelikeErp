const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const studentSchema = mongoose.Schema(
  {
    studentName: { type: String, required: [true, "Student Name is required"] },
    studentEmail: {
      type: String,
      unique: [true, "Email must be unique"],
      required: [true, "Email is required"],
    },
    studentPassword: {
      type: String,
      required: [true, "Password is required"],
    },
    studentId: {
      type: String,
      unique: [true, "Student should be unqiue"],
    },
    studentGrade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grade",
    },
    studentIdCardNumber: {
      type: String,
      unique: [true, "Student Id Card number must be unique"],
    },
    studentIdCardCopy: {
      type: String,
    },
    studentCourses: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
      },
    ],
    studentAvatar: String,
    studentResults: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Result",
      },
    ],
  },
  { timestamp: true }
);

studentSchema.pre("save", async function (next) {
  if (!this.isModified("studentPassword")) return next();
  try {
    this.studentPassword = await bcrypt.hash(this.studentPassword, 10);
    next();
  } catch (error) {
    next(error);
  }
});

const studentModel = mongoose.model("Student", studentSchema);

module.exports = studentModel;
