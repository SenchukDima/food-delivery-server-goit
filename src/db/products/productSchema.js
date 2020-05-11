const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    "id": String,
	"sku": Number,
	"name": String,
	"description": String,
	"price": Number,
	"currency": String,
	"creatorId": String,
	"created": String,
	"modified": String,
    "categories": Array,
    "likes": Number
  });

  module.exports = mongoose.model('Products', productsSchema);

  