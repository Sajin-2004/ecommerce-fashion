const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// POST /api/orders/create
router.post("/create", orderController.createOrder);

// GET /api/orders/user/:userId
router.get("/user/:userId", orderController.getUserOrders);

module.exports = router;