var express = require('express');
var http = require('http');

var PORT = 8000;



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

http.Server(app).listen(PORT, function() {
    console.log("HTTP server listening on port %s", PORT);
});

