const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

 brand:String,
 category:String,
 type:String,
 price:Number,
 rating:Number,
 image:String

});

module.exports = mongoose.model("Product",productSchema);