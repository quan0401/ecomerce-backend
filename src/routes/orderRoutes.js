import express from "express";
import {
  createOrder,
  getOrder,
  getOrders,
  getOrdersForAnalysis,
  getUserOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from "../controller/orderController";
import { verifyAdmin, verifyIsLoggedIn } from "../middleware/verifyAuthToken";

const orderRoutes = express.Router();

orderRoutes.use(verifyIsLoggedIn);
orderRoutes.get("/", getUserOrders);
orderRoutes.get("/user/:id", getOrder);
orderRoutes.post("/", createOrder);
orderRoutes.put("/paid/:id", updateOrderToPaid);

// Admin
orderRoutes.use(verifyAdmin);
orderRoutes.put("/delivered/:id", updateOrderToDelivered);
orderRoutes.get("/admin", getOrders);
orderRoutes.get("/analysis/:date", getOrdersForAnalysis);

export default orderRoutes;
