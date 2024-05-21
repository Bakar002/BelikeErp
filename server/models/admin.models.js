const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminSchema = mongoose.Schema(
  {
    adminName: String,
    adminEmail: {
      type: String,
      unique: [true, "Email must be unique"],
      required: [true, "Password is required"],
    },
    adminPassword: {
      type: String,
      select: false,
      required: [true, "Password is required"],
    },
    adminAvatar: String,
  },
  { timestamps: true }
);

adminSchema.pre("save", async function (next) {
  if (!this.isModified("adminPassword")) return next();
  try {
    this.adminPassword = await bcrypt.hash(this.adminPassword, 10);
    next();
  } catch (error) {
    return next(error);
  }
});
const adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel;
