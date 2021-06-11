const io = require("socket.io-client");		//Socket.IO module gia ton client



//Orizoume to URL gia ti syndesi me ton master
//Exoume dosei onomata ston master kai stous workers outos oste na mporoume na anaferomaste se aytous
//xoris na xrisimopoioume tis IP dieythinseis tous
const URL = "http://hybrid-linux_master_1:8085";



const socket = io.connect(URL, {reconnect:true});		//Anoigei mia syndesi me ton master (server), sto port 8085



socket.on('connect', (socket) => {		//Otan o client syndethei me ton server, emfanizetai katallilo minima
	console.log("Client connected");
});



//O client akouei gia tyxon minimata apo ton server kai otan o server steilei minima 
//ston client sxetika me kapoia alagi pou exei ginei sti vasi dedomenon, 
//o client to lamvanei kai to emfanizei sto terminal
socket.on('change_msg', (msg) => {
	console.log(msg);
});
