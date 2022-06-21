const mongoose = require("mongoose");

const ShippingAddressSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true},
    name: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    address: { type: String, required: true },
  },
  { collection: "ShippingAddress" }
);

module.exports = mongoose.model("ShippingAddress", ShippingAddressSchema);
