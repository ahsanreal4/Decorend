const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    userID: {type:mongoose.Schema.Types.ObjectId, required: true},
    productType: {type: String, required: true},
    fields: { type: JSON, required: true },
    imagesUrl: {type:[String], required: true},
  },
  { collection: "Product" }
);

module.exports = mongoose.model("Product", ProductSchema);
