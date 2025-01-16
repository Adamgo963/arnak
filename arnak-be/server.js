const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  console.log("Client connected.");

  socket.on("counter", (data) => {
    console.log(data);
    io.emit("counter_update", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected.");
  });
});

server.listen(5000, () => console.log("Server listening on port 5000."));
