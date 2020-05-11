const mongoose = require('mongoose');

const postOrderSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
      creator: String,
      productsList: Array,
      deliveryType: String,          // "delivery" || "office"
      deliveryAdress: String,
      sumToPay: Number,
      status: String                  // "inProgress" || "declined" || "finished" || "failed"
  });

  module.exports = mongoose.model('Order', postOrderSchema);