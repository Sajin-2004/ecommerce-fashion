const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_placeholder_key",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "rzp_test_placeholder_secret"
});

// Create Razorpay Order
exports.createOrder = async (req, res) => {
    try {
        const { amount, currency = "INR" } = req.body;

        const options = {
            amount: amount * 100, // Amount in paise
            currency,
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        console.error("Razorpay Error:", error);
        res.status(500).json({ message: "Error creating Razorpay order", error: error.message });
    }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "rzp_test_placeholder_secret")
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            return res.status(200).json({ message: "Payment verified successfully", success: true });
        } else {
            return res.status(400).json({ message: "Invalid signature", success: false });
        }
    } catch (error) {
        console.error("Verification Error:", error);
        res.status(500).json({ message: "Error verifying payment", error: error.message });
    }
};
