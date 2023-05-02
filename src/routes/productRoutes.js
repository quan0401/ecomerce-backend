import express from "express";
import { getProducts } from "../controller/productController";

const productRoutes = express.Router();

productRoutes.get("/", getProducts);

export default productRoutes;
