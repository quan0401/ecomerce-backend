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
    if (!token) res.status(401).json({ EC: 1, EM: "JWT must be provided" });
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

app.get("/clear-token", (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .send({ EC: 0, EM: "Cookie is cleared" });
  } catch (error) {
    next(error);
  }
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);

export default app;
