<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io("http://localhost:8000");
</script>

import { io } from "socket.io-client";

socket({
	log: {
	  x: 42
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

