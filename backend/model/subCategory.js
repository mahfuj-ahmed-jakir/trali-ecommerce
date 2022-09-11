const mongoose = require("mongoose");
const { Schema } = mongoose;

const subCategorySchema = new Schema({
  subCategory: {
    type: String,
    required: true,
    unique: true,
  },
  approve: {
    type: Boolean,
    default: false,
  },
});

const SubCategory = mongoose.model("subcategory", subCategorySchema);

module.exports = SubCategory;
