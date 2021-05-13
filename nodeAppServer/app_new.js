const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


var PORT = 8080;

app.get('/', (req, res) => {
    var message = req.query["connection"]
    console.log(JSON.stringify(message))
    res.send({message: message});
});

app.post('/', (req, res) => {
    var message = req.body["connection"]
    console.log(JSON.stringify(message))
    //console.log(req)
    res.send({message: message});
});

io.on("connection", (socket) => {
  console.log('a user connected');
});

http.Server(app).listen(PORT, () => {
    console.log("HTTP server listening on port %s", PORT);
});

