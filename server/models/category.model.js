import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
  createdBy: {
    type: String,
    enum: ["Admin", "Seller", "Other"]
  },
  stock: {
    type: Number
  },
  tagID: {
    type: Number
  }
});

export default mongoose.model("Category", categorySchema)