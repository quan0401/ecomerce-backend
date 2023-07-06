require("dotenv").config();

import express from "express";

import connectDB from "./config/db";

import apiRoutes from "./routes/apiRoutes";

import bodyParser from "body-parser";

import fileUpload from "express-fileupload";

import cookieParser from "cookie-parser";

import importData from "./seeder/seeder";

import helmet from "helmet";

import { Server } from "socket.io";

import { createServer } from "http";

const app = express();

const port = 8000;

// socket io
const httpSever = createServer(app);
global.io = new Server(httpSever);

const admins = [];
const activeChats = [];

io.on("connection", (socket) => {
  socket.on("client sends message", (data) => {
    if (admins.length === 0) {
      socket.emit("no admins", "");
    } else {
      const client = activeChats.find(
        (client) => client.clientId === socket.id
      );
      let targetAdminId;
      if (client) {
        targetAdminId = client.adminId;
      } else {
        targetAdminId = admins[Math.floor(Math.random() * admins.length)].id;
        activeChats.push({ clientId: socket.id, adminId: targetAdminId });
      }
      socket.broadcast
        .to(targetAdminId)
        .emit("server sends message from client to admin", {
          client: socket.id,
          message: data,
        });
    }
  });

  socket.on("admin sends message", ({ message, user }) => {
    socket.broadcast
      .to(user)
      .emit("server sends message from admin to client", {
        message,
      });
  });
  socket.on("admin connects to server", (admin) => {
    admins.push({ id: socket.id, admin });
  });

  socket.on("admin deleted conversation", (data) => {
    socket.broadcast.emit("admin deleted chat", "Admin deleted conversation");
    if (io.sockets.sockets[socket.id]) {
      io.sockets.sockets[socket.id].disconnect();
    }
  });

  socket.on("disconnect", (reason) => {
    const disconnectAdmin = admins.findIndex((item) => item.id === socket.id);
    if (disconnectAdmin !== -1) {
      admins.splice(disconnectAdmin, 1);
    }
    const clientIndex = activeChats.findIndex(
      (item) => item.clientId === socket.id
    );
    if (clientIndex !== -1) {
      activeChats.splice(clientIndex, 1);
    }
    socket.broadcast.emit("disconnected", { reason, socketId: socket.id });
  });
});

const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.json({ message: "API running..." });
  });
}

// Use Helmet!
app.use(helmet());

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
