const io = require("socket.io-client");

const URL = "http://localhost:8000";

const socket = io.connect(URL, {reconnect:true});

socket.on('connect', (socket) => {
		console.log("Client connected");
});

socket.on('change_msg', (msg) => {
		console.log(msg);
});
