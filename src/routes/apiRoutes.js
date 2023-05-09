import express from "express";
import productRoutes from "./productRoutes";
import orderRoutes from "./orderRoutes";
import categoryRoutes from "./categoryRoutes";
import userRoutes from "./userRoutes";
import { verify } from "jsonwebtoken";
require("dotenv").config();

const app = express();

app.get("/get-token", (req, res, next) => {
  try {
    const token = req.cookies["access_token"];
    const decoded = verify(token, process.env.JWT_SECRET_KEY);
    if (decoded)
      res.status(200).send({
        token: decoded.firstName + " " + decoded.lastName,
        isAdmin: decoded.isAdmin,
      });
  } catch (error) {
    next(error);
  }
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);

export default app;
