const mongoose = require("mongoose");
const databaseConnection = (MONGO_URI) => {
  mongoose
    .connect(MONGO_URI)
    .then((con) =>
      console.log(`Database is connected on: ${con.connection.host}`)
    )
    .catch((error) => console.log(`An error occured in database: ${error}`));
};

module.exports = databaseConnection;
