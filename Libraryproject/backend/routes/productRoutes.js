const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
    const products = await Product.find();
    res.json(products);
});
router.get("/category/:type/:category", async (req, res) => {

    const { type, category } = req.params;

    const products = await Product.find({
        type: type,
        category: category
    });

    res.json(products);

});


// GET MENS PRODUCTS
router.get("/category/mens", async (req, res) => {
    const products = await Product.find({ category: "mens" });
    res.json(products);
});


// GET KIDS PRODUCTS
router.get("/category/kids", async (req, res) => {
    const products = await Product.find({ category: "kids" });
    res.json(products);
});

// GET SINGLE PRODUCT BY ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
