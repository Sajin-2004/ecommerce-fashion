const Order = require("../models/order");

// Create new order
exports.createOrder = async (req, res) => {
    try {
        const {
            userId,
            products,
            totalPrice,
            address,
            paymentMethod
        } = req.body;

        const newOrder = new Order({
            userId,
            products,
            totalPrice,
            address,
            paymentMethod,
            date: new Date(),
            status: "Pending"
        });

        const savedOrder = await newOrder.save();
        res.status(201).json({
            message: "Order placed successfully",
            order: savedOrder
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error: error.message });
    }
};

// Get orders for a specific user
exports.getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({ userId }).sort({ date: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};
