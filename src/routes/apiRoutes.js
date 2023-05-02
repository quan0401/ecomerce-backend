import express from "express";
import Product from "../models/ProductModel";
import { getProducts } from "../controller/productController";

const router = express.Router();

const initApiRoutes = (app) => {
  router.get("/", getProducts);

  return app.use("/api/products", router);
};

export default initApiRoutes;
