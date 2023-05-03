import express from "express";
import { getAllController } from "../controller/productController";

const productRoutes = express.Router();

productRoutes.get("/", getAllController);

productRoutes.get("/category/:categoryName", getAllController);

export default productRoutes;
