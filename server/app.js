const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require('cors');



const app = express();

app.use(cors({
  origin: 'https://erp-frontend-s74v.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const admin = require("./routes/admin.routes");
const teacher = require("./routes/teacher.routes");
const student = require("./routes/student.routes");
app.use("/api/v1/admin/", admin);
app.use("/api/v1/teacher/", teacher);
app.use("/api/v1/student", student);
module.exports = app;
