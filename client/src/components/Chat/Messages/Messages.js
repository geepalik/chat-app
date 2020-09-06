import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


const Messages = ({messages}) =>{
  return (
    <List>
      {messages.flatMap((message, index) => [(
        <ListItem alignItems="flex-start" key={index}>
          <ListItemAvatar>
            <Avatar alt="Avatar alt text" src="https://placekitten.com/200/200" />
          </ListItemAvatar>
          <ListItemText
            primary={message}
          />
        </ListItem>
        ),<Divider variant="inset" component="li" key={"divider-"+index} />])}
    </List>
  )
};

export default Messages;