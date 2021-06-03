var express = require('express');
var http = require('http');
var app = express();
//const cors = require('cors');
const helmet = require('helmet');
app.use(helmet());
app.use(express.json());
var serverPort = "8085";
var server = http.createServer(app);
const io = require("socket.io")(server);
require('dotenv').config();
var MongoClient = require('mongodb').MongoClient;

/*
var allowedOrigins = [ 
      "http://hybrid-linux_worker_*:8085"
      ];
*/

/*
const io = require("socket.io")(server, {
   cors: {
         origin: allowedOrigins,
         methods: ["GET", "POST"]
   }
});
*/

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

var connectWithRetry = function() {

		return MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true},(err, client) => {
	  		if(err)
				{
						console.error("\n Failed to connect to mongodb on startup - retrying in 5 seconds \n\n", err);
            setTimeout(connectWithRetry, 5000);
				}
				else
				{
		  			var db = client.db(process.env.MONGO_INITDB_DATABASE);
						console.log("Connected to mongodb");
		  			const taskCollection = db.collection(process.env.MONGO_INITDB_COLLECTION);
		  			const changeStream = taskCollection.watch();

		  			changeStream.on('change', (change) => {
							  if (change.operationType === 'insert') 
								{
								  const content = {
                      id: change.fullDocument._id,
                      message: change.fullDocument.message,
                      tailed_path: change.fullDocument.tailed_path,
                      time: change.fullDocument.time
                  }

									console.log(content);
									transmit(content);
								}
								else if (change.operationType === 'invalidate')
                {
                    console.log("ChangeStream closed");
                }
						});
				}				
		});
};
connectWithRetry();

//---------------------------------------------//
