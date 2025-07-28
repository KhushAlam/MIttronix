import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [
    {
      productInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      priceAtPurchase: {
        type: Number,
        required: true
      }
    }
  ],
  shippingAddress: {
    fullName: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    phone: String
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Card", "UPI", "NetBanking"],
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed", "Refunded"],
    default: "Pending"
  },
  orderStatus: {
    type: String,
    enum: ["Processing", "Packaging", "Shipped", "Delivered", "Cancelled"],
    default: "Processing"
  },
  totalAmount: {
    type: Number,
    required: true
  },
  orderDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
})

export default mongoose.model("Order", orderSchema);