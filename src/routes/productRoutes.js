import express from "express";
import { getProductsController } from "../controller/productController";

const productRoutes = express.Router();

productRoutes.get("/", getProductsController);

productRoutes.get("/category/:categoryName", getProductsController);

productRoutes.get(
  "/category/:categoryName/search/:searchQuery",
  getProductsController
);

productRoutes.get("/search/:searchQuery", getProductsController);

export default productRoutes;
