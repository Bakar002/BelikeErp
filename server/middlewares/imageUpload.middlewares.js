const multer = require("multer");

const multipleUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype.startsWith("image/") ||
      file.mimetype.startsWith("video/")
    ) {
      callback(null, true);
    } else {
      callback(
        new Error("Invalid file type. Only images and videos are allowed.")
      );
    }
  },
}).fields([
  { name: "teacherAvatar", maxCount: 1 },
  { name: "teacherIdCardCopy", maxCount: 1 },
  { name: "studentAvatar", maxCount: 1 },
  { name: "studentIdCardCopy", maxCount: 1 },
  { name: 'studentIdPhoto', maxCount: 1 },
   { name: 'lastDegree', maxCount: 1 },
   { name: "paymentSlip", maxCount: 1 },

]);

module.exports = multipleUpload;
