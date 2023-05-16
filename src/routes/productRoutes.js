import express from "express";

import {
  getProducts,
  getProductById,
  getBestseller,
  adminGetProdcts,
  adminDeleteProduct,
  adminCreateProduct,
  adminDeleteAll,
  adminUpdateProduct,
  adminUploadFile,
  adminDeleteProductImage,
} from "../controller/productController";

import { verifyAdmin, verifyIsLoggedIn } from "../middleware/verifyAuthToken";

const productRoutes = express.Router();

productRoutes.get("/", getProducts);

productRoutes.get("/category/:categoryName", getProducts);

productRoutes.get("/category/:categoryName/search/:searchQuery", getProducts);

productRoutes.get("/search/:searchQuery", getProducts);

productRoutes.get("/bestseller", getBestseller);

// best seller need to be put above id
// productRoutes.get("/:id", getProductById);

productRoutes.get("/get-one/:id", getProductById);

// Admin Routes
productRoutes.use(verifyIsLoggedIn, verifyAdmin);

productRoutes.get("/admin", adminGetProdcts);

productRoutes.delete("/admin/:id", adminDeleteProduct);

productRoutes.post("/admin", adminCreateProduct);

productRoutes.put("/admin/:id", adminUpdateProduct);

productRoutes.post("/admin/upload", adminUploadFile);

productRoutes.delete(
  "/admin/image/:imagePath/:productId",
  adminDeleteProductImage
);

productRoutes.delete("/admin/delete/:name", adminDeleteAll);

export default productRoutes;
