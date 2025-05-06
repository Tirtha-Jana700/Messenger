const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
  socket.on("chat message", (data) => {
    io.emit("chat message", data);
  });

  socket.on("file", (data) => {
    io.emit("file", data);
  });

  socket.on("typing", (username) => {
    socket.broadcast.emit("typing", username);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
