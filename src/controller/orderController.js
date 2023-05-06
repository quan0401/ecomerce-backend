import Order from "../models/OrderModel";
import mongoose from "mongoose";
import Product from "../models/ProductModel";

export const getUserOrders = async (req, res, next) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const orders = await Order.find({ user: { _id: userId } });

    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

export const getOrder = async (req, res, next) => {
  try {
    const orders = await Order.findById(req.params.id)
      .populate("user", "-password -_id -isAdmin -createdAt -updatedAt -__v")
      .orFail();

    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
};

export const createOrder = async (req, res, next) => {
  try {
    const { orderTotal, cartItems, paymentMethod } = req.body;
    if (!(orderTotal && cartItems && paymentMethod))
      res.status(400).send("All inputs are required");

    const productIds = [];
    const quantity = [];
    cartItems.forEach((item) => {
      productIds.push(item.productId);
      quantity.push(item.quantity);
    });

    await Order.create({
      orderTotal,
      cartItems,
      paymentMethod,
      user: new mongoose.Types.ObjectId(req.user._id),
    });

    await Product.find({ _id: { $in: productIds } }).then((products) => {
      products.forEach((product, index) => {
        product.sales += quantity[index];
        product.save();
      });
    });

    res.status(200).send({ productIds, quantity });
  } catch (error) {
    next(error);
  }
};
