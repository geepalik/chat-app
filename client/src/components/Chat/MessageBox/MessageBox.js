import React,{useState, useRef} from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

//renaming prop for use in the component
const MessageBox = ({onSendMessage: pushSendMessage}) => {
  const [message, setMessage] = useState("");
  const messageRef = useRef("");

  const sendMessageClick = () =>{
    pushSendMessage(messageRef.current.value);
    setMessage("");
  }

  return (
    <form className="chat-form" autoComplete="off">
      <TextField
        id="standard-basic"
        label="Standard"
        margin="normal"
        multiline
        fullWidth
        rows="4"
        inputRef={messageRef}
        onChange={event => setMessage(event.target.value)}
        onKeyDown={event => {
          if(event.key === "Enter"){
            //prevents enter from being pressed
            event.preventDefault();
            pushSendMessage(message);
            setMessage("");
          }
        }}
        value={message}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={sendMessageClick}
      >
        Send
      </Button>
    </form>
  );
};

export default MessageBox;