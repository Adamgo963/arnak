const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const staticPath = path.resolve(__dirname, ".", "dist");
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

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    app.use(express.static(staticPath));
    const indexFile = path.join(__dirname, "dist", "index.html");
    return res.sendFile(indexFile);
  });
}

server.listen(5000, () => console.log("Server listening on port 5000."));
