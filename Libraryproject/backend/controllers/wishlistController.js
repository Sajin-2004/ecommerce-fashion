const Wishlist = require("../models/wishlist");

// Add item to wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { userId, productId, brand, category, type, price, image, rating } = req.body;

        // Check if already in wishlist
        const exists = await Wishlist.findOne({ userId, productId });
        if (exists) {
            return res.status(400).json({ message: "Product already in wishlist" });
        }

        const newItem = new Wishlist({
            userId,
            productId,
            brand,
            category,
            type,
            price,
            image,
            rating
        });

        await newItem.save();
        res.status(201).json({ message: "Added to wishlist", item: newItem });
    } catch (error) {
        res.status(500).json({ message: "Error adding to wishlist", error: error.message });
    }
};

// Remove item from wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        await Wishlist.findOneAndDelete({ userId, productId });
        res.status(200).json({ message: "Removed from wishlist" });
    } catch (error) {
        res.status(500).json({ message: "Error removing from wishlist", error: error.message });
    }
};

// Get user wishlist
exports.getWishlist = async (req, res) => {
    try {
        const { userId } = req.params;
        const wishlist = await Wishlist.find({ userId });
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Error fetching wishlist", error: error.message });
    }
};
