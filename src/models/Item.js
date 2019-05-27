const mongoose = require("mongoose");

const { Schema } = mongoose;

const itemSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    quantity: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true },
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
