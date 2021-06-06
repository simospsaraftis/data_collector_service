const repl = require("repl");
const io = require("socket.io-client");

const URL = "http://hybrid-linux_master_1:8086";

const socket = io.connect(URL, {reconnect:true});

socket.on('connect', (socket) => {
		console.log("Client connected");
});

/*
socket.on('change_msg', (msg) => {
		console.log(msg);
});
*/

repl.start({
		prompt: '',
		eval: (cmd) => {
			socket.send(cmd)
		}
});
