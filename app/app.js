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
const cors = require('cors');
const helmet = require('helmet');
app.use(helmet());
app.use(express.json());
var serverPort = "8085";
var server = http.createServer(app);
const io = require("socket.io")(server);
require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;


var allowedOrigins = [ 
      "http://hybrid-linux_worker_*:8085"
      ];

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


const io = require("socket.io")(server, {
   cors: {
         origin: allowedOrigins,
         methods: ["GET", "POST"]
   }
});

//------------Server Listen---------------//

server.listen(serverPort, () => {
		console.log("HTTP server listening on port %s", serverPort);
});

//----------------------------------------//


//-----------Socket.IO-------------//

io.on('connection', (socket) => {
		console.log("Client connected");
		socket.on('disconnect',() => {
				console.log("Client disconnected");
		});
});


const transmit = change => {
		io.emit('change_msg',change);
}

//-------------------------------------------//


//---------------ChangeStream---------------//

var mongourl = "mongodb://"+process.env.MONGO_INITDB_ROOT_USERNAME+":"+process.env.MONGO_INITDB_ROOT_PASSWORD+"@"+process.env.MONGO_INITDB_NAME+":"+process.env.MONGO_INITDB_PORT+"/";

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
				transmit(change);
		});
		};
});

//---------------------------------------------//
