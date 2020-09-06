import React, {useRef} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const LoginForm = ({onSend: setEnteredUserName}) => {
  const userNameInput = useRef("");

  const enterChatClick = () =>{
    setUserName(userNameInput.current.value);
  }

  const setUserName = (userName) =>{
    //checks here
    //for length
    setEnteredUserName(userName);
  }

  return (
    <form className="login-form" autoComplete="off">
      <TextField
        id="chat-username"
        label="Enter Username"
        margin="normal"
        fullWidth
        rows="1"
        inputRef={userNameInput}
        onKeyDown={event => {
          if(event.key === "Enter"){
            event.preventDefault();
            setUserName(event.target.value);
          }
        }}

      />
      <Button
        variant="contained"
        color="primary"
        onClick={enterChatClick}
      >
        Enter Chat
      </Button>
    </form>
  )
}

export default LoginForm;