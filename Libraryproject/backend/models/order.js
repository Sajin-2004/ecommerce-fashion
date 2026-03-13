const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: String,
  price: Number,
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false // Keep false so guest purchases still work
  },
  products: [{
    productId: String,
    quantity: { type: Number, default: 1 },
    price: Number
  }],
  totalPrice: Number,
  status: {
    type: String,
    default: "Pending" // e.g., Pending, Shipped, Delivered
  },
  address: {
    type: Object, // Stores name, mobile, addressLine, city, pincode
    required: false
  },
  paymentMethod: {
    type: String,
    default: "COD"
  },
  razorpayOrderId: String,
  paymentId: String,
  paymentStatus: {
    type: String,
    default: "Pending" // e.g., Pending, Completed, Failed
  }
});

module.exports = mongoose.model("Order", orderSchema);