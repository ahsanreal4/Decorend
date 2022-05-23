const mongoose = require("mongoose");

const CanvasSchema = new mongoose.Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, required: true },
    imageUrl: {type: String, required: true},
    canvas: { type: String, required: true },
  },
  { collection: "Canvas" }
);

module.exports = mongoose.model("Canvas", CanvasSchema);
