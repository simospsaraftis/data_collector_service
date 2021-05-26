const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server)
const mongoose = require('mongoose');

mongoose.connect("mongodb://swarmlabmongo1:27017/");

const db = mongoose.connection;

var PORT = 8000;

db.on('error', console.error.bind(console, 'Connection Error:'));

db.once('open', () => {
	console.log("DB opened");
	server.listen(PORT, () => {
    console.log("HTTP server listening on port %s", PORT);
});

const taskCollection = db.collection('logs');
      const changeStream = taskCollection.watch();
        
      changeStream.on('change', (change) => {
      console.log(change);
      });
});


/*
app.get('/', function(req, res) {
		res.sendFile(__dirname + '/index.html');
});
*/

io.on('connection', (socket) => {
		console.log("Client connected");

		socket.on('disconnect', () => {
				console.log("Client disconnected");
		});
});
