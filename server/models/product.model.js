import mongoose from "mongoose";
import Category from "./category.model.js";

const productShcema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  colour: {
    type: String,
  },
  specification: {
    type: String,
  },
  stockStatus: {
    type: String,
    enum: ["InStock", "OutOfStock"],
    default: "InStock",
  },
  stockQuantity: {
    type: Number,
  },
  brand: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Product", productShcema);
