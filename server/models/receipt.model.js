
const mongoose = require('mongoose');

// Define schema and model
const receiptSchema = new mongoose.Schema({
    name: String,
    class: String,
    fee: String,
    cnic: String,
    paymentMethod: String,
  });
  
  const Receipt = mongoose.model("Receipt", receiptSchema);
  module.exports = Receipt;
