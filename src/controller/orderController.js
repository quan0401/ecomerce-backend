import Order from "../models/OrderModel";
import mongoose from "mongoose";

const getOrders = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const orders = await Order.find({ user: { _id: userId } });

    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};
export { getOrders };
