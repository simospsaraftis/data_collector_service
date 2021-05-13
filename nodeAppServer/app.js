var express = require('express');
var http = require('http');

const { Server } = require('socket.io');
const io = new Server(http);

var PORT = 8080;


var app = express();
app.get('/', function(req, res) {
    var message = req.query["log"]
    console.log(JSON.stringify(message))
    res.send({message: message});
});

app.post('/', function(req, res) {
    var message = req.body["log"]
    console.log(JSON.stringify(message))
    //console.log(req)
    res.send({message: message});
});

io.on("log", (socket) => {
  console.log('log');
});

http.Server(app).listen(PORT, function() {
    console.log("HTTP server listening on port %s", PORT);
});

