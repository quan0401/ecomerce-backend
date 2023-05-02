import express from "express";
import connectDB from "./config/db";
import apiRoutes from "./routes/apiRoutes";

const app = express();
const port = 8000;

// Api routes
app.use("/api", apiRoutes);

// Mongodb connection
connectDB();

// To send error to the frontend
app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message, stack: error.stack });
});

app.listen(port, () => {
  console.log(`>>> Backend app listening on port ${port}`);
});
