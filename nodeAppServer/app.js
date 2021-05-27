const app = require('express')();
const http = require('http').Server(app);
const io = require("socket.io")(http);
const MongoClient = require('mongodb').MongoClient;

var PORT = 8000;

const URL = "mongodb://swarmlab:swarmlab@swarmlabmongo1:27017/";

http.listen(PORT, () => {
		console.log("HTTP server listening on port %s", PORT);
});

io.on('connection', (socket) => {
		console.log("Client connected");
		socket.on('disconnect',() => {
				console.log("Client disconnected");
		});
});

MongoClient.connect(URL,{useUnifiedTopology:true},(err, client) => {
		var db = client.db('app_swarmlab');
		const taskCollection = db.collection('logs');
		const changeStream = taskCollection.watch();

		changeStream.on('change', (change) => {
    		console.log(change);
				io.emit('change_msg',change);
		});
});

