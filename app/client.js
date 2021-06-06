//Socket.IO vivliothiki gia ton client
const io = require("socket.io-client");

//Orizoume to URL gia ti syndesi me ton master
//Exoume dosei onomata ston master kai stous workers
//outos oste na mporoume na anaferomaste se aytous
//xoris na xrisimopoioume tis IP dieythinseis tous
const URL = "http://hybrid-linux_master_1:8085";

//Entoli pou anoigei mia syndesi me ton master (server), sto port 8085
const socket = io.connect(URL, {reconnect:true});

//Otan o client syndethei me ton server, emfanizetai katallilo minima
socket.on('connect', (socket) => {
		console.log("Client connected");
});

//O client akouei gia minimata apo ton server kai otan o server steilei minima 
//ston client sxetika me kapoia alagi pou exei ginei sti vasi dedomenon, 
//o client to lamvanei kai to emfanizei stin othoni
socket.on('change_msg', (msg) => {
		console.log(msg);
});
