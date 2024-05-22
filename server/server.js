const app = require("./app");
const databaseConnection = require("./config/database.config.js");
require("dotenv").config();
const cloudinary = require("cloudinary");
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Imran Malik test",
  });
});
const PORT = process.env.PORT || 5500;
databaseConnection(process.env.MONGO_URI);




app.listen(PORT, () => {
  console.log(`Server is running on: ${PORT}`);
});
