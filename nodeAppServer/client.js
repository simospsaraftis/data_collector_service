const io = require("socket.io-client");
const ioClient = io.connect("http://localhost:8080");

ioClient.on('connect', (socket) => {
		console.log("Client connected");

});
