const socketIO = require('socket.io');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

const dotenv = require('dotenv');
dotenv.config();

const fileUploadMiddleware = require('./middleware/fileUploadMiddleware');
const db = require('./models');
const Message = db.messages;

const io = socketIO(process.env.SOCKET_PORT);
const app = express();

io.on("connection", (socket) =>{
  console.log("Connection established");

  getMostRecentMessages()
    .then(results => {
      console.log(results);
      socket.emit("mostRecentMessages", results.reverse());
    })
    .catch(error => {
      console.log(error);
      socket.emit("mostRecentMessages", []);
    });

  socket.on("newChatMessage",(data) => {
    //send event to every single connected socket
    try{
      const message = {
        user_name: data.user_name,
        message_text: data.message,
      }
      Message.create(message).then(()=>{
        io.emit("newChatMessage",{user: data.user_name, user_avatar: data.user_avatar, message: data.message});
      }).catch(error => console.log("error: "+error))
    }catch (e) {
      console.log("error: "+e);
    }
  });
  socket.on("disconnect",()=>{
    console.log("connection disconnected");
  });
});

/**
 * get 10 last messages
 * @returns {Promise<Model[]>}
 */
async function getMostRecentMessages (){
  return await Message.findAll({
    raw: true,
    attributes: [['user_name','user'],['message_text','message']],
    order: [["created_at", "DESC"]],
    limit: 10,
    offset: 0
  });
}

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

app.post('/api/upload', upload.single('avatar'), fileUploadMiddleware.uploadImage);

app.listen(process.env.HTTP_PORT,()=>console.log(`HTTP Server listening on ${process.env.HTTP_PORT}`))