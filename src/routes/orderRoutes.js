import express from "express";
import { getOrders } from "../controller/orderController";
import { verifyAdmin, verifyIsLoggedIn } from "../middleware/verifyAuthToken";

const orderRoutes = express.Router();

orderRoutes.use(verifyIsLoggedIn);
orderRoutes.get("/", getOrders);

// Admin
orderRoutes.use(verifyAdmin);

export default orderRoutes;
