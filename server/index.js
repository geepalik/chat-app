import socketIO from 'socket.io';
import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

import dotenv from 'dotenv';
dotenv.config();

import userController from './controllers/userController';
import fileUploadMiddleware from './middleware/fileUploadMiddleware';

const io = socketIO(process.env.SOCKET_PORT);
const app = express();

io.on("connection", (socket) =>{
  console.log("Connection established");

  socket.emit("mostRecentMessages", [
    {user: "malakas", message: "re sy"},
    {user: "allos malakas", message: "ti einai re sy?"},
    {user: "allos malakas", message: "ti einai re sy?"},
    {user: "allos malakas", message: "ti einai re sy?"},
    {user: "allos malakas", message: "ti einai re sy?"},
  ]);

  socket.on("newChatMessage",(data) => {
    //send event to every single connected socket
    io.emit("newChatMessage",{user: data.currentUserName, message: data.message});
  });
  socket.on("disconnect",()=>{
    console.log("connection disconnected");
  });
});

app.use((req, res, next) => {
  //allow access from every, elminate CORS
  res.setHeader('Access-Control-Allow-Origin','*');
  res.removeHeader('x-powered-by');
  //set the allowed HTTP methods to be requested
  res.setHeader('Access-Control-Allow-Methods','GET, POST');
  //headers clients can use in their requests
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  //allow request to continue and be handled by routes
  next();
});

//sending json data
app.use(bodyParser.json());

//handle http request for username and image for upload
const storage = multer.memoryStorage();
const upload = multer({storage});

app.post('/api/upload',upload.single('avatar'), fileUploadMiddleware, userController.saveNewUser);

app.listen(process.env.HTTP_PORT,()=>console.log(`HTTP Server listening on ${process.env.HTTP_PORT}`))