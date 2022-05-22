const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: {type: String, required: true, unique: true},
    fields: { type: JSON, required: true },
  },
  { collection: "Product" }
);

module.exports = mongoose.model("Product", ProductSchema);
