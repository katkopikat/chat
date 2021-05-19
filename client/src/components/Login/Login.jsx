import { useState } from 'react';
import io from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import VideocamIcon from '@material-ui/icons/Videocam';
import ChatIcon from '@material-ui/icons/Chat';

import './Login.css';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  
const Login = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const classes = useStyles();

  const startVideoChatClick = () => {
    console.log('start video ', name, room)
  }

  const startTextChatClick = () => {
    io('http://localhost:5000');
    console.log('start video ', name, room)
  }

  const handleChangeName = (value) => {
    setName(value);
  }

  const handleChangeRoom = (value) => {
    setRoom(value);
  }

  return (
    <div className="login__wrapper">
       <h1>Hey, how you doing?</h1>
       <form className={classes.root} noValidate autoComplete="off">
          <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => handleChangeName(e.target.value)}
          />
          <TextField
          id="outlined-basic"
          label="Room"
          variant="outlined"
          value={room}
          onChange={(e) => handleChangeRoom(e.target.value)}
          />
          <div className="wrapper__btns">
            <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ChatIcon />}
            onClick={startTextChatClick}
            >
            Text chat
            </Button>

            <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<VideocamIcon />}
            onClick={startVideoChatClick}
            >
            Video chat
            </Button>
          </div>
      </form>
    </div>
  );
}

export default Login;
