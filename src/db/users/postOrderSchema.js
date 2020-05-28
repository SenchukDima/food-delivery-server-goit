const mongoose = require('mongoose');

const postOrderSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
      creator: String,
      productsList: Array,
      deliveryType: String,          
      deliveryAdress: String,
      sumToPay: Number,
      status: String                 
  });

  module.exports = mongoose.model('Order', postOrderSchema);