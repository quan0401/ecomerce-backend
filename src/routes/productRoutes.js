import express from "express";
import {
  getProductsController,
  getProductByIdController,
  getBestsellerController,
} from "../controller/productController";

const productRoutes = express.Router();

productRoutes.get("/", getProductsController);

productRoutes.get("/category/:categoryName", getProductsController);

productRoutes.get(
  "/category/:categoryName/search/:searchQuery",
  getProductsController
);

productRoutes.get("/search/:searchQuery", getProductsController);

productRoutes.get("/bestseller", getBestsellerController);
// best seller need to be put above id
productRoutes.get("/:id", getProductByIdController);

export default productRoutes;
