import express from "express";
import connectDB from "./config/db";
import apiRoutes from "./routes/apiRoutes";
import bodyParser from "body-parser";
import importData from "./seeder/seeder";

const app = express();
const port = 8000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// app.use(express.json());

// Mongodb connection
// importData();
connectDB();

// Api routes
app.use("/api", apiRoutes);

// To send error to the frontend
app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).json({ message: error.message, stack: error.stack });
});

app.listen(port, () => {
  console.log(`>>> Backend app listening on port ${port}`);
});
