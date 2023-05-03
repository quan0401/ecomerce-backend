import mongoose from "mongoose";
import User from "./UserModel";

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User,
  },
  orderTotal: {
    itemsCount: { type: Number, required: true },
    cartSubTotal: { type: Number, required: true },
  },
  cartItems: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { path: { type: String, required: true } },
      quantity: { type: Number, required: true },
      count: { type: Number, required: true },
    },
  ],
  transactionResult: {
    status: { type: String },
    createTime: { type: String },
    amount: { type: Number },
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: String,
    required: true,
    default: false,
  },
  deliverAt: {
    type: Date,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
