import {useEffect, useState, useRef} from "react";
import socketIOClient from "socket.io-client";

const useChat = () => {
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() =>{
    socketRef.current = socketIOClient("http://localhost:5000");

    socketRef.current.on("mostRecentMessages", (mostRecentMessages) =>{
      //on start, set as messages the mostRecentMessages
      //in case the server restarts, we want to replace the current messages
      //with those from database
      //not add more
      setMessages(messages => [...mostRecentMessages]);
    });

    socketRef.current.on("newChatMessage",({user, user_avatar, message}) =>{
      //append message to the end of array, after using spread operator
      setMessages(messages => [...messages, {user: user, avatar: user_avatar, message: message}]);

      //this will not work
      //useeffect runs once, when the component first loads
      //acts as closuer that has access to messages
      //setMessages([...messages, message])
    })

    return ()=>{
      socketRef.current.disconnect();
    }
  },[]);

  //message is part of an object
  const sendMessage = (messageObject) =>{
    socketRef.current.emit("newChatMessage", messageObject)
  }

  return {messages, sendMessage};
}

export default useChat;