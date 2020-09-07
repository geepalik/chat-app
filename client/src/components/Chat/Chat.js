import React from "react";
import MessageBox from "./MessageBox/MessageBox";
import Messages from "./Messages/Messages";
import useChat from "./useChat";

const Chat = (currentUserData) => {
  //useChat calls to our custom hook
  //it returns an object with messages and sending a message
  const {messages, sendMessage} = useChat();
  return (
    <div>
      <Messages
        messages={messages}
      />
      <MessageBox
        userData={currentUserData}
        onSendMessage={message => {
          sendMessage(message);
        }}
      />
    </div>
  );
};

export default Chat;