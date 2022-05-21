const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    fields: { type: JSON, required: true },
  },
  { collection: "Product" }
);

module.exports = mongoose.model("Product", ProductSchema);
