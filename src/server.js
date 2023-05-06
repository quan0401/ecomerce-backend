import express from "express";
import connectDB from "./config/db";
import apiRoutes from "./routes/apiRoutes";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

import importData from "./seeder/seeder";

const app = express();
const port = 8000;
// File upload
app.use(fileUpload());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// app.use(express.json());

// Cookie
app.use(cookieParser());

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
