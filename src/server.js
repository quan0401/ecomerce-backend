import express from "express";

import connectDB from "./config/db";

import apiRoutes from "./routes/apiRoutes";

import bodyParser from "body-parser";

import fileUpload from "express-fileupload";

import cookieParser from "cookie-parser";

import importData from "./seeder/seeder";

import { Server } from "socket.io";

import { createServer } from "http";
import cors from "cors";

const app = express();

const port = 8000;

// socket io
const httpSever = createServer(app);
global.io = new Server(httpSever);

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
  const message = error.message;

  const stack = error.stack;

  const regex = /"(.*?)"/g;

  const substrings = message.match(regex);

  if (process.env.NODE_ENV === "development") {
    if (message.startsWith("No document found")) {
      const model = substrings[1].substring(1, substrings[1].length - 1);

      res.status(404).send({ EC: 1, EM: "Not found " + model });

      return;
    } else {
      console.log({ message, stack });
    }
    res.status(500).json({ message, stack });
  } else res.status(500).json({ message });
});

httpSever.listen(port, () => {
  console.log(`>>> Backend app listening on port ${port}`);
});
