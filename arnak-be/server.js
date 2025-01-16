const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const port = 5000;
const staticPath = path.resolve(__dirname, "dist");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://arnak.onrender.com/",
    methods: ["GET", "POST"],
  },
});

app.use(express.static(staticPath));

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

app.get("*", (req, res) => {
  const indexFile = path.join(__dirname, "dist", "index.html");
  return res.sendFile(indexFile);
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
