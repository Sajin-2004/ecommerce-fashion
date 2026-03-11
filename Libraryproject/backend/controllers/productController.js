const Product = require("../models/product");

exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.json(products);
};

exports.searchProducts = async (req, res) => {
    const key = req.params.key;
    const products = await Product.find({
        $or: [
            { brand: { $regex: key, $options: "i" } },
            { category: { $regex: key, $options: "i" } },
            { type: { $regex: key, $options: "i" } }
        ]
    });
    res.json(products);
};

exports.filterProducts = async (req, res) => {
    const { type, category } = req.params;
    const products = await Product.find({
        type: type,
        category: category
    });
    res.json(products);
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
