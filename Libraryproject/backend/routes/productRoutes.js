const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// GET ALL PRODUCTS
router.get("/", async (req,res)=>{
 const products = await Product.find();
 res.json(products);
});
router.get("/category/:type/:category", async (req,res)=>{

const {type,category} = req.params;

const products = await Product.find({
type:type,
category:category
});

res.json(products);

});


// GET MENS PRODUCTS
router.get("/category/mens", async (req,res)=>{
 const products = await Product.find({category:"mens"});
 res.json(products);
});


// GET KIDS PRODUCTS
router.get("/category/kids", async (req,res)=>{
 const products = await Product.find({category:"kids"});
 res.json(products);
});

module.exports = router;