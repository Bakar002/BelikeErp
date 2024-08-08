const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema(
  {
    adminName: {
      type: String,
      required: [true, "Admin name is required"],
    },
    adminEmail: {
      type: String,
      unique: [true, "Email must be unique"],
      required: [true, "Email is required"],
    },
    adminPassword: {
      type: String,
      select: false,
      required: [true, "Password is required"],
    },
    adminAvatar: {
      type: String,
    },
    address: {
      type: String,

    },
    locationLink: {
      type: String,

    },
    contactNumber: {
      type: String,

    },
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
