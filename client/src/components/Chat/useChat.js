import {useEffect, useState, useRef} from "react";
import socketIOClient from "socket.io-client";

const useChat = () => {
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() =>{
    socketRef.current = socketIOClient("http://localhost:5000");

    socketRef.current.on("mostRecentMessages", (mostRecentMessages) =>{
      setMessages(messages => [...messages, ...mostRecentMessages]);
    });

    socketRef.current.on("newChatMessage",({user, message}) =>{
      //append message to the end of array, after using spread operator
      setMessages(messages => [...messages, {user: user, message: message}]);

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