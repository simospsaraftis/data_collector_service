<script src="/socket.io/socket.io.js"></script>

var socket = io();

io.on("connection", (socket) => {
  console.log("a user connected");
});

