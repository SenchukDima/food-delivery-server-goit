const mongoose = require('mongoose');

  const ingredientsSchema = new mongoose.Schema({
	"_id": mongoose.Types.ObjectId,
	// "products": { type: mongoose.Types.ObjectId, ref: 'Products' },
    "name": { type: String, required: true },
    "description": { type: String, required: true }, 
   });

  module.exports = mongoose.model('Ingredient', ingredientsSchema);