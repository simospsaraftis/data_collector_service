var express = require('express');
var http = require('http');
var app = express();
//const cors = require('cors');
const helmet = require('helmet');
app.use(helmet());
app.use(express.json());

//I porta stin opoia tha akouei o server
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

//----------------------------------------
//O server akouei gia tyxon syndeseis client se ayton, sto port pou vrisketai sti metavliti serverPort
server.listen(serverPort, () => {
		console.log("HTTP server listening on port %s", serverPort);
});

//-----------------------------------------


//--------------------------------------------
//Otan kapoios client pragmatopoiisei sindesi ston server, emfanizetai katallilo minima
//Antistoixo minima emfanizetai kai otan o client aposyndethei
io.on('connection', (socket) => {
		console.log("Client connected");
		socket.on('disconnect',() => {
				console.log("Client disconnected");
		});
});

//Stathera mesa stin opoia pragmatopoieitai i apostoli ton dedomenon pou eiserxontai sti vasi, stous komvous tou sminous
const transmit = change => {
		io.emit('change_msg',change);
}

//-------------------------------------------


//------------------------------------------------
//Block kodika meso tou opoiou o server pragmatopoiei syndesi me ti vasi kai anoigei ena ChangeStram gias na akouei tyxon
//alages pou symvainoun sti vasi kai na tis stelnei stous ypoloipous komvous tou sminous
//Ta stoixeia syndesis sti vasi einai apothikeymena mesa se environment variables
//Se periptosi pou gia kapoio logo den einai epityxis i sndesi me ti vasi otan pragmatopoieitai syndesi gia proti fora,
//o server epixeirei na syndethei xana me ti vasi ana 5 deyterolepta
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

//----------------------------------------------------------------------------------------------
