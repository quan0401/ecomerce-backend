import express from "express";
import apiRoutes from "./routes/apiRoutes";
import connectDB from "./config/db";

const app = express();
const port = 8000;

apiRoutes(app);

// Mongodb connection
connectDB();

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message, stack: error.stack });
});

app.listen(port, () => {
  console.log(`>>> Backend app listening on port ${port}`);
});
