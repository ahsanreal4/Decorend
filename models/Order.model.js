const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    OrderBy: { type: mongoose.Schema.Types.ObjectId, required: true },
    OrderTo: { type: mongoose.Schema.Types.ObjectId, required: true },
    OrderItems: { type: [String], required: true },
    OrderStatus: { type: Number, required: true },
    OrderAmount: {type: String, required: true}
  },
  { collection: "Order" }
);

module.exports = mongoose.model("Order", OrderSchema);
