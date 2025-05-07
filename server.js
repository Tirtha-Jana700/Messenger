const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Joining a private chat room
    socket.on("joinRoom", (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
    });

    // Sending messages in the private room
    socket.on("sendMessage", ({ room, message }) => {
        io.to(room).emit("receiveMessage", message);
    });

    // Handling disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(3000, "0.0.0.0", () => console.log("Server running on port 3000"));