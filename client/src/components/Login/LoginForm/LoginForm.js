import React, {useRef, useState} from "react";
import {TextField, Fab, Button} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Loader from "react-loader-spinner";
import axios from "axios";

const LoginForm = ({setUserDataForChat}) => {
  const [loading, setLoading] = useState(false);
  const userNameInput = useRef("");
  const imageInput = useRef("");

  const enterChatClick = () =>{
    setUserName(userNameInput.current.value, imageInput.current.files[0]);
  }

  const sendData = async (options) => {
    return await axios.post('http://localhost:5002/api/upload',options);
  }

  const setUserName = (userName, imageFile) =>{
    if(userName === ""){
      return false;
    }
    if(imageFile === undefined){
      setUserDataForChat({
        user_name: userName,
      });
    }else{
      setLoading(true);
      const data = new FormData();
      data.append('avatar',imageFile);
      try{
        sendData(data)
          .then(response => {
            setUserDataForChat({
              user_name: userName,
              user_avatar: response.data.user_avatar_url
            });
          })
          .catch( error => {
            alert(error);
          })
          .finally(() => setLoading(false))
      }catch (e) {

      }
    }
  }

  return loading ? (<Loader type="ThreeDots" color="#2BAD60" height={100} width={100} />) : (
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
            setUserName(event.target.value, imageInput.current.files[0]);
          }
        }}
      />
      <label>
        <input
          style={{display:"none"}}
          id="upload-avatar"
          name="upload-avatar"
          ref={imageInput}
          type="file"
          accept="image/x-png,image/gif,image/jpeg"
        />
        <Fab
          color="secondary"
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
        >
          <AddIcon /> Upload avatar
        </Fab>
        <br />
        <br />
      </label>
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