const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true, select: false}
  });

  module.exports = mongoose.model('UserLogin', userSchema);

  