const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  approve: {
    type: Boolean,
    default: false,
  },
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
