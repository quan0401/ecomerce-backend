import express from "express";
import { getAll } from "../controller/orderController";

const orderRoutes = express.Router();

orderRoutes.get("/getAll", getAll);

export default orderRoutes;
