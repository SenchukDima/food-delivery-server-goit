const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId,
    username: String,
    telephone: String,
    password: String,
    email: String,
    favoriteProducts: Array,
    viewedProducts: Array,
    orders: Array
  });

  module.exports = mongoose.model('User', signUpSchema);