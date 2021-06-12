var express = require('express');		//Module gia to web application framework
var app = express();		//Dimiourgia enos express application


const helmet = require('helmet');		//To module helmet parexei asfaleia 
app.use(helmet());                  //sto express app thetontas HTTP headers


app.use(express.json());		//Orizoume oti tha xeirizetai ta requests os JSON


var http = require('http');		//Module pou epitrepei metafora dedomenon pano apo to HTTP protocol
var serverPort = "8086";		//Orizoume tin porta stin opoia tha akouei o server
var server = http.createServer(app);		//Dimiourgia tou server


require('dotenv').config();		//Module gia ti fortosi ton environment variables


var MongoClient = require('mongodb').MongoClient;		//Dimiourgei ena MongoClient instance gia ti syndesi me ti MongoDB



//Module pou parexei enan mixanismo meso tou opoiou o server orizei apo poio allo
//origin pera apo to diko tou tha epitrepei prosvasi stous porous tou
const cors = require('cors');

//Anaferoume oti tha epitrepetai i prosvasi se olo to diktyo meso tou port 8085
//kai tha apagoreyetai i prosvasi se osous aitountai prosvasi
//alla vriskontai ektos tou diktiou
var allowedOrigins = [ 
	"http://0.0.0.0:8085"
];


//Module pou parexei to Socket.IO gia tin amfidromi epikoinonia metaxi client kai server
//Anaferoume oti tha epitrepetai i prosvasi apo ta origins pou orizoume sti metavliti allowedOrigins
//gia GET kai POST
const io = require("socket.io")(server, {
	cors: {
		origin: allowedOrigins,
		methods: ["GET", "POST"]
	}
});




//O server akouei gia tyxon syndeseis client se ayton, sto port pou vrisketai sti metavliti serverPort
server.listen(serverPort, () => {
	console.log("HTTP server listening on port %s", serverPort);
});



//Otan kapoios client sindethei me ton server, emfanizetai katallilo minima
//Antistoixo minima emfanizetai kai otan o client aposyndethei
io.on('connection', (socket) => {
	console.log("Client connected");

	socket.on('disconnect',() => {
		console.log("Client disconnected");
	});
});



//Block kodika meso tou opoiou o server pragmatopoiei syndesi me ti vasi kai anoigei ena ChangeStream gia na akouei gia 
//tyxon allages pou symvainoun sti vasi kai na tis stelnei stous ypoloipous komvous tou sminous
//Ta stoixeia syndesis sti vasi einai apothikeymena mesa se environment variables
//Se periptosi pou gia kapoio logo den einai epityxis i syndesi me ti vasi otan pragmatopoieitai syndesi gia proti fora,
//o server epixeirei na syndethei xana me ti vasi kathe 5 deyterolepta

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


			//To ChangeStream akouei gia tyxon allages pou symvainoun sti vasi
			//Otan pragmatopoieithei kapoio insert sti syllogi "logs" tis vasis,
			//tha stalei ena insert event ston server meso tou ChangeStream 
			//kai o server afou emfanisei to periexomeno tou event sto termatiko tou, tha ta steilei stous clients meso tou io.emit()
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
					io.emit('change_msg',content);
				}
				//Ean stalei kapoio invalidate event tote to ChangeStream tha kleisei
				//Opote exoume orisei se ayti ti periptosi na emfanizetai sto termatiko to minima "ChangeStream closed"
				//Ena invalidate event stelnetai otan ginei drop i metonomasia tis syllogis i opoia parakoloutheitai 
				//meso to ChangeStream, i otan ginei drop olokliris tis vasis
				else if (change.operationType === 'invalidate')
				{
					console.log("ChangeStream closed");
				}
			});
		}				
	});
};
connectWithRetry();

