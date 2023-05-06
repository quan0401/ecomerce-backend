import express from "express";
import {
  createOrder,
  getOrder,
  getUserOrders,
} from "../controller/orderController";
import { verifyAdmin, verifyIsLoggedIn } from "../middleware/verifyAuthToken";

const orderRoutes = express.Router();

orderRoutes.use(verifyIsLoggedIn);
orderRoutes.get("/", getUserOrders);
orderRoutes.get("/user/:id", getOrder);
orderRoutes.post("/", createOrder);

// Admin
orderRoutes.use(verifyAdmin);

export default orderRoutes;
