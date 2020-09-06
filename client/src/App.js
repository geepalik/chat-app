import React, {useState} from "react";
import Chat from "/components/Chat/Chat"
import LoginForm from "./components/Login/LoginForm/LoginForm";

import "./App.css"

const App = () =>{
  const [userName, setUserName] = useState("");

  if(userName === ""){
    return (
      <div className="container">
        <div className="container-title">Welcome to our Chat App</div>
        <LoginForm  onSend={setUserName} />
      </div>
    )
  }
  return (
    <Chat
      currentUserName={userName}
    />
  );
}

export default App;