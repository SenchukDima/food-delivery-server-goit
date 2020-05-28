const mongoose = require('mongoose');

const comentsSchema = new mongoose.Schema({
    "_id": mongoose.Types.ObjectId,
    "product": String,
    "author": String,
    "text": String, 
    "mark": Number, 
   });

  module.exports = mongoose.model('Coment', comentsSchema);

