const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
	"_id": mongoose.Schema.Types.ObjectId,
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
	"likes": Number,
	"ingredient": [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }, { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }]
  });

  module.exports = mongoose.model('Product', productsSchema);
