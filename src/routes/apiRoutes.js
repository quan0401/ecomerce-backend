import express from "express";
import productRoutes from "./productRoutes";
import orderRoutes from "./orderRoutes";
import categoryRoutes from "./categoryRoutes";
import userRoutes from "./userRoutes";

const app = express();

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);

export default app;
