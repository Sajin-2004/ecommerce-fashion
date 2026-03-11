const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    subcategory: String, // Maps to old 'type'
    type: String,        // Legacy support
    price: { type: Number, required: true },
    originalPrice: Number,
    description: String,
    image: { type: String, required: true },
    stock: { type: Number, default: 10 },
    rating: { type: Number, default: 4 }
});



module.exports = mongoose.model("Product", productSchema);