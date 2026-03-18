require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/authRoutes");
const Product = require("./models/product");
const Order = require("./models/order");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const adminRoutes = require("./routes/adminRoutes");
const uploadRoute = require("./routes/uploadRoute");
const wishlistRoutes = require("./routes/wishlistRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const contactRoutes = require("./routes/contactRoutes");
const authMiddleware = require("./middleware/authMiddleware");


app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin/upload-products", uploadRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/contact", contactRoutes);


/* ---------------- MongoDB Connection ---------------- */

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Atlas Connected"))
.catch(err => console.log(err));


/* ---------------- Test Route ---------------- */

app.get("/", (req, res) => {
  res.send("FashionHub Backend Running");
});


/* ---------------- Get All Products ---------------- */

app.get("/api/products", async (req, res) => {

  try {

    const products = await Product.find();

    res.json(products);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});


app.get("/api/products/filter/:type/:category", async (req, res) => {

  try {

    const { type, category } = req.params;

    const products = await Product.find({
      type: type,
      category: category
    });

    res.json(products);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }

});


/* ---------------- Search Products ---------------- */

app.get("/api/products/search/:key", async (req, res) => {

  try {

    const key = req.params.key;

    const products = await Product.find({
      $or: [
        { category: { $regex: key, $options: "i" } },
        { brand: { $regex: key, $options: "i" } },
        { type: { $regex: key, $options: "i" } }
      ]
    });

    res.json(products);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }

});


/* ---------------- Category + Subcategory ---------------- */

app.get("/api/products/:category/:subcategory", async (req, res) => {

  const { category, subcategory } = req.params;

  try {

    const products = await Product.find({
      category: category,
      subcategory: subcategory
    });

    res.json(products);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});


/* ---------------- Buy Now Order API ---------------- */
// Optional Auth Middleware for checking out if logged in
const optionalAuth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return next();
  try {
    const verified = require("jsonwebtoken").verify(token.replace("Bearer ", ""), process.env.JWT_SECRET || "fashionhub_secret");
    req.user = verified;
  } catch (err) { }
  next();
};

app.post("/api/orders", optionalAuth, async (req, res) => {

  try {

    const orderData = {
      productId: req.body.productId || null,
      price: req.body.price || null,
      products: req.body.products || [{ productId: req.body.productId, price: req.body.price, quantity: 1 }],
      totalPrice: req.body.totalPrice || req.body.price,
      address: req.body.address || null,
      paymentMethod: req.body.paymentMethod || "COD"
    };

    if (req.user) {
      orderData.userId = req.user._id;
    }

    const order = new Order(orderData);

    await order.save();

    res.json({
      message: "Order placed successfully"
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});


/* ---------------- Start Server ---------------- */

app.listen(5000, () => {

  console.log("Server running on port 5000");

});