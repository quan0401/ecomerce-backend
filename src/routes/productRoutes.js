import express from "express";
import {
  getProductsController,
  getProductByIdController,
  getBestsellerController,
  adminGetProdctsController,
  adminDeleteProductController,
  adminCreateProductController,
  adminDeleteAllController,
  adminUpdateProductController,
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
// productRoutes.get("/:id", getProductByIdController);

productRoutes.get("/get-one/:id", getProductByIdController);

// Admin Route
productRoutes.get("/admin", adminGetProdctsController);
productRoutes.delete("/admin/:id", adminDeleteProductController);
productRoutes.post("/admin", adminCreateProductController);
productRoutes.put("/admin/:id", adminUpdateProductController);

productRoutes.delete("/admin/delete/:name", adminDeleteAllController);

export default productRoutes;
