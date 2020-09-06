import util from "util";
import socketIO from "socket.io";

const PORT = process.env.PORT || 5000;

const io = socketIO(PORT);

io.on("connection", (socket) =>{
  console.log("Connection established");

  socket.on("newChatMessage",(data)=>{
    console.log(`Message received: ${util.inspect(data,{depth: null})}`);
    //send event to every single connected socket
    io.emit("newChatMessage",{user: data.currentUserName, message: data.message});
  });
  socket.on("disconnect",()=>{
    console.log("connection disconnected");
  });
})

console.log(`Server listening on ${PORT}`);