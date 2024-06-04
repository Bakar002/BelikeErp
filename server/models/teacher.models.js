const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const teacherSchema = new mongoose.Schema({
  teacherName: {
    type: String,
    required: [true, "Teacher Name is required"],
  },
  teacherEmail: {
    type: String,
    unique: [true, "Teacher Email should be unique"],
    required: [true, "Teacher Email is required"],
  },
  teacherPassword: {
    type: String,
    select: false,
    required: [true, "Teacher Password is required"],
  },
  teacherSalary: {
    type: String,
  },
  teacherCourses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    },
  ],
  teacherGrades: [
    {
      gradeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade",
      },
    },
  ],
  teacherJobDate: {
    type: Date,
    default: Date.now,
  },
  teacherIdCardNumber: {
    type: String,
    unique: [true, "Teacher Id Card number must be unique"],
  },
  teacherIdCardCopy: {
    type: String,
  },
  teacherAvatar: {
    type: String,
  },
  teacherGradeIncharge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true, // Ensure that adminId is always provided
  },
});

teacherSchema.index({ adminId: 1, teacherEmail: 1 }, { unique: true });
teacherSchema.index({ adminId: 1, teacherIdCardNumber: 1 }, { unique: true });


teacherSchema.pre("save", async function (next) {
  if (!this.isModified("teacherPassword")) return next();
  try {
    this.teacherPassword = await bcrypt.hash(this.teacherPassword, 10);
    next();
  } catch (error) {
    next(error);
  }
});

const teacherModel = mongoose.model("Teacher", teacherSchema);

module.exports = teacherModel;
