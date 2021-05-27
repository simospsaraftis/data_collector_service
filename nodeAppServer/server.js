const app = require('express')();
const http = require('http').Server(app);
const io = require("socket.io")(http);

var PORT = 8000;

http.listen(PORT, () => {
    console.log("HTTP server listening on port %s", PORT);
});

io.on('connection', (socket) => {
		console.log("Client connected");
});
