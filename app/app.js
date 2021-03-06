var express = require('express');		//Module gia to web application framework
var app = express();		//Dimiourgia enos express application


const helmet = require('helmet');		//To module helmet parexei asfaleia sto express app thetontas HTTP headers
app.use(helmet());


app.use(express.json());		//Orizoume oti tha xeirizetai ta requests os JSON


var http = require('http');		//Module pou epitrepei metafora dedomenon pano apo to HTTP protocol
var serverPort = "8085";		//Orizoume tin porta stin opoia tha akouei o server
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



var resume_token = null		//Metavliti stin opoia apothikeyetai to simeio apo opou tha arxisei to ChangeStream otan antimetopistei to error

//Synartisi i opoia otan kaleitai dimiourgei to ChangeStream
function watch_collection(client) {
	var changeStream = client.db(process.env.MONGO_INITDB_DATABASE).collection(process.env.MONGO_INITDB_COLLECTION).watch({resumeAfter: resume_token})

	//To ChangeStream akouei gia tyxon allages pou symvainoun sti vasi
	//Otan pragmatopoiithei kapoio insert sti syllogi "logs" tis vasis,
	//tha stalei ena insert event ston server meso tou ChangeStream
	//kai o server afou emfanisei to periexomeno tou event sto termatiko tou, tha ta steilei stous clients meso tou io.emit()
	changeStream.on('change', data => {
		resume_token = data._id
		if (data.operationType === 'insert')
		{
			const content = {
				id: data.fullDocument._id,
				message: data.fullDocument.message,
				tailed_path: data.fullDocument.tailed_path,
				time: data.fullDocument.time
			}

		console.log(content);
		io.emit('change_msg',content);
		}
		//Ean stalei kapoio invalidate event tote to ChangeStream tha kleisei
		//Opote exoume orisei se ayti ti periptosi na emfanizetai sto termatiko to minima "ChangeStream closed"
		//Ena invalidate event stelnetai otan ginei drop i metonomasia tis syllogis i opoia parakoloutheitai
		//meso to ChangeStream, i otan ginei drop olokliris tis vasis
		else if (data.operationType === 'invalidate')
		{
			console.log("ChangeStream closed");
			//process.exit(1);
		}
	})
	//Ean yparxei kapoio error, emfanizetai sto termatiko
	//kai kaleitai xana i synartisi watch_collection gia na dimiourgithei xana to ChangeStream
	//Otan apokatastathei to provlima, meso tou resume_token to kainourio ChangeStream 
	//tha synexisei apo ekei pou eixe meinei to proigoumeno
	changeStream.on('error', err => {
		console.error(err);
		watch_collection(client);
	})
};

//Asynxroni synartisi meso tis opoias  pragmatopoieitai i syndesi me ti vasi kai kaleitai i synartisi watch_collection
//i opoia anoigei ena ChangeStream gia na akouei o server gia tyxon allages pou symvainoun sti vasi 
// kai na tis stelnei stous ypoloipous komvous tou sminous
//Ta stoixeia syndesis sti vasi einai apothikeymena mesa se environment variables
//Se periptosi pou gia kapoio logo den einai epityxis i sndesi me ti vasi otan pragmatopoieitai syndesi gia proti fora,
//o server epixeirei na syndethei xana me ti vasi kalontas ti synartisi connect_with_retry kathe 5 deyterolepta

var mongourl = "mongodb://"+process.env.MONGO_INITDB_ROOT_USERNAME+":"+process.env.MONGO_INITDB_ROOT_PASSWORD+"@"+process.env.MONGO_INITDB_NAME+":"+process.env.MONGO_INITDB_PORT+"/";

async function connect_with_retry() {

	try
	{
		var client = await MongoClient.connect(mongourl,{useNewUrlParser: true, useUnifiedTopology: true});
		console.log("Connected to mongodb");
		watch_collection(client);
	}
	catch (err)
	{
		console.error("\n Failed to connect to mongodb on startup - retrying in 5 seconds \n\n", err);
		setTimeout(connect_with_retry, 5000);
	}
};
connect_with_retry();

