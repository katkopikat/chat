import { useState } from 'react';
import axios from 'axios';
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

  
const Login = ({ onLogin }) => {
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isLoading, setLoading] = useState(false);
  const classes = useStyles();

  // const startVideoChatClick = () => {
  //   console.log('start video ', userName, roomId)
  // }

  const startTextChatClick = async () => {
    if(!userName || !roomId) {
      alert('User`s name and Room`s ID required and can`t be empty')
    } else {
      const obj = {
        roomId,
        userName
      };
      setLoading(true)
      await axios.post('/rooms', obj)
      onLogin(obj);
    }
  }

  const handleChangeName = (value) => {
    setUserName(value);
  }

  const handleChangeRoom = (value) => {
    setRoomId(value);
  }

  return (
    <div className="login__wrapper">
       <h1>Hey, how you doing?</h1>
       <form className={classes.root} noValidate autoComplete="off">
          <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          value={userName}
          onChange={(e) => handleChangeName(e.target.value)}
          required
          />
          <TextField
          id="outlined-basic"
          label="Room ID"
          variant="outlined"
          value={roomId}
          onChange={(e) => handleChangeRoom(e.target.value)}
          required
          />
          <div className="wrapper__btns">
              <Button
              disabled={isLoading}
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<ChatIcon />}
              onClick={startTextChatClick}
              >
              Text chat
              </Button>
            {/* <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<VideocamIcon />}
            onClick={startVideoChatClick}
            >
            Video chat
            </Button> */}
          </div>
      </form>
    </div>
  );
}

export default Login;
