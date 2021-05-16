var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require("socket.io")(server)
var MongoClient = require('mongodb').MongoClient;
var PORT = 8080;


server.listen(PORT, () => {
		console.log("HTTP server listening on port %s", PORT);
});

app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
		console.log("Client connected");

		socket.on('disconnect', () => {
				console.log("Client disconnected");
		});
});
