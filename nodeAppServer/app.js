/*
const app = require('express')();
const http = require('http').Server(app);
const io = require("socket.io")(http);
const MongoClient = require('mongodb').MongoClient;
*/

//var fs = require('fs');
var express = require('express');
var http = require('http');
var app = express();
const dotenv = require('dotenv');
//const cors = require('cors');
const helmet = require('helmet');
var MongoClient = require('mongodb').MongoClient;

/*
var allowedOrigins = [ 
      "http://localhost:8085"
      ];
*/

/*
app.use(cors({
origin: function(origin, callback){    // allow requests with no origin 
      if(!origin) 
        return callback(null, true);    
        if(allowedOrigins.indexOf(origin) === -1){
          var msg = 'Not allowed';
          return callback(new Error(msg), false);
         }
      return callback(null, true);
    }
}));
*/

dotenv.config();

app.use(helmet());

app.use(express.json());

var serverPort = 8085;
var server = http.createServer(app);

/*
const io = require("socket.io")(server, {
   cors: {
         origin: allowedOrigins,
         //origin: [ "http://localhost:8085" ],
         methods: ["GET", "POST"]
   }
});
*/

const io = require("socket.io")(server);

//const URL = "mongodb://swarmlab:swarmlab@swarmlabmongo1:27017/";

var mongourl = "mongodb://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@swarmlabmongo1:27017/";


server.listen(serverPort, () => {
		console.log("HTTP server listening on port %s", serverPort);
});

io.on('connection', (socket) => {
		console.log("Client connected");
		socket.on('disconnect',() => {
				console.log("Client disconnected");
		});
		socket.on('start', (value) => {
				console.log("start"+ value);
		});
});

MongoClient.connect(mongourl,{useNewUrlParser: true,useUnifiedTopology: true},(err, client) => {
		if(err) 
		{
				console.log(err);
		} 
		else 
		{
			console.log("Connected to swarmlabmongo1");
		  var db = client.db('app_swarmlab');
		  const taskCollection = db.collection('logs');
		  const changeStream = taskCollection.watch();

		  changeStream.on('change', (change) => {
      	console.log(change);
				io.emit('change_msg',change);
		});
		};
});

