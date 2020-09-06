import socketIO from "socket.io";

const PORT = process.env.PORT || 5000;

const io = socketIO(PORT);

io.on("connection", (socket) =>{
  console.log("Connection established");

  socket.on("newChatMessage",(data)=>{
    console.log(`Message received: ${data}`);
    //send event to every single connected socket
    io.emit("newChatMessage",data);
  });
  socket.on("disconnect",()=>{
    console.log("connection disconnected");
  });
})

console.log(`Server listening on ${PORT}`);