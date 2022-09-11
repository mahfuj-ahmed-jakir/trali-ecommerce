const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  disPrice: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  color: {
    type: [String],
    default: [],
  },
  size: {
    type: [String],
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  approve: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
