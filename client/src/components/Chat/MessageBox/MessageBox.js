import React,{useState} from "react";
import TextField from "@material-ui/core/TextField";

//renaming prop for use in the component
const MessageBox = ({onSendMessage: pushSendMessage}) => {
  const [message, setMessage] = useState("");
  return (
    <TextField
      id="standard-basic"
      label="Standard"
      margin="normal"
      multiline
      fullWidth
      rows="4"
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
  );
};

export default MessageBox;