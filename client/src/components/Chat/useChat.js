import {useEffect, useState, useRef} from "react";
import socketIOClient from "socket.io-client";

const useChat = () => {
  const socketRef = useRef();
  const [messages, setMessages] = useState([]);

  //when component mounts and changes
  useEffect(() =>{
    socketRef.current = socketIOClient("http://localhost:5001");

    socketRef.current.on("mostRecentMessages", (mostRecentMessages) =>{
      //on start, set as messages the mostRecentMessages
      //in case the server restarts, we want to replace the current messages
      //with those from database
      //not add more
      setMessages(messages => [...mostRecentMessages]);
    });

    socketRef.current.on("newChatMessage",({user_name, user_avatar, message_text}) =>{
      //append message to the end of array, after using spread operator
      setMessages(messages => [...messages, {user_name: user_name, user_avatar: user_avatar, message_text: message_text}]);

      //this will not work
      //useeffect runs once, when the component first loads
      //acts as closure that has access to messages (parent scope)
      //when it first runs, messages is empty array
      //when you add new messages to the messages array, it is no longer empty
      //and the array is changed (not mutated, new array)
      //with this way you're no longer able to access the current value of messages here
      //you would have access only to the first value of messages (empty array)
      //and means you won't be able to append more messages
      //so instead we use the above, that's we use a callback that will get the latest value of messages
      //and then appends the latest data
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