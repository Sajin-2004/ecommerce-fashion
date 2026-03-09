const Product = require("../models/product");

exports.getAllProducts = async(req,res)=>{

 const products = await Product.find();
 res.json(products);

};

exports.searchProducts = async(req,res)=>{

 const key = req.params.key;

 const products = await Product.find({
  $or:[
   {brand:{$regex:key,$options:"i"}},
   {category:{$regex:key,$options:"i"}},
   {type:{$regex:key,$options:"i"}}
  ]
 });

 res.json(products);

};

exports.filterProducts = async(req,res)=>{

 const {type,category} = req.params;

 const products = await Product.find({
  type:type,
  category:category
 });

 res.json(products);

};