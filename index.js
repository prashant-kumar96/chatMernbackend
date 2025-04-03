

// Import dependencies
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
    cors:{origin:"*"}
});

// Serve static files
app.use(express.static("public"));

let latestLocation = { lat: 28.7041, lng: 77.1025 }; 

// Handle socket connection
app.get("/getMapLocation", (req, res) => {
    res.json({ location: latestLocation });
  });

  
io.on("connection", (socket) => {
    console.log("A user connected");
    
    socket.on("sendLocation", (data) => {
        console.log(data)
        latestLocation = data;
        io.emit("updateLocation", data); // Broadcast to all clients
    });
    
    
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Start server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
