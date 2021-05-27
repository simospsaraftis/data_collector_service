const MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://swarmlab:swarmlab@swarmlabmongo1:27017/",{useUnifiedTopology:true},(err, client) => {
var db = client.db('app_swarmlab');
const taskCollection = db.collection('logs');
const changeStream = taskCollection.watch();

changeStream.on('change', (change) => {
		console.log(change);
	});
});
