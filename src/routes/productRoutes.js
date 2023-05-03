import express from "express";
import { getAll } from "../controller/productController";

const productRoutes = express.Router();

productRoutes.get("/", getAll);

export default productRoutes;
