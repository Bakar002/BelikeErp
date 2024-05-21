const DataUriParser = require("datauri/parser.js");
const path = require("path");
const getDataUri = (file) => {
  const parser = new DataUriParser();
  const extensionName = path.extname(file.originalname).toString();
  return parser.format(extensionName, file.buffer);
};
module.exports = getDataUri;
