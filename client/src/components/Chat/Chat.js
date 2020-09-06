import React from "react";
import MessageBox from "./MessageBox/MessageBox";
import Messages from "./Messages/Messages";
import useChat from "./useChat";

const Chat = ({currentUserName}) => {
  //useChat calls to our custom hook
  //it returns an object with messages and sending a message
  const {messages, sendMessage} = useChat();
  return (
    <div>
      <Messages
        messages={messages}
        loggedUser={currentUserName}
      />
      <MessageBox
        onSendMessage={message => {
          sendMessage({currentUserName, message});
        }}
      />
    </div>
  );
};

export default Chat;