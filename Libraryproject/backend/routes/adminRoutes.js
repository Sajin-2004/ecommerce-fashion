const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Product = require("../models/product");
const Order = require("../models/order");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Admin Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, role: "admin" });

        if (!user) return res.status(401).json({ message: "Invalid admin credentials" });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Invalid admin credentials" });

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            process.env.JWT_SECRET || "fashionhub_secret",
            { expiresIn: "1d" }
        );

        res.json({ token, user: { _id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Admin Middleware required for routes below
router.use(authMiddleware);
router.use(adminMiddleware);

// Manage Products - Add Product
router.post("/products", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json({ message: "Product created successfully", product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Manage Products - Update Product
router.put("/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product updated successfully", product });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Manage Products - Delete Product
router.delete("/products/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Dashboard - View All Orders
router.get("/orders", async (req, res) => {
    try {
        const orders = await Order.find().populate("userId", "name email");
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Dashboard - View All Users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
