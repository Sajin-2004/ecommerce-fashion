const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    brand: String,
    category: String,
    type: String,
    price: Number,
    image: String,
    rating: Number
});

module.exports = mongoose.model("Wishlist", wishlistSchema);
