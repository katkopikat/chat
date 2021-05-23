import { useEffect, useReducer } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login/Login'
import TextChatRoom from'./components/TextChatRoom/TextChatRoom'
import socket from './socket';
import axios from 'axios';
import reducer from './redux/reducer'
import { setOnLogin,
         setData,
         setUsers,
         setMessage,
         setUserLeaveRoom
        } from './redux/actions';
import './App.css';

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    isLogin: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  });

  const onLogin = async (obj) => {
    dispatch(setOnLogin(obj));
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch(setData(data));
  };

  const setOnlineUsers = (users) => { dispatch(setUsers(users)) };

  const setNewMessage = (msgs) => { dispatch(setMessage(msgs)) };

  const leaveRoom = () => {
    socket.disconnect();
    dispatch(setUserLeaveRoom());
    socket.connect();
  }

  useEffect(() => {
    socket.on('ROOM:SET_ONLINE_USERS', setOnlineUsers);
    socket.on('ROOM:SET_NEW_MESSAGE', setNewMessage);
  }, [])

  window.socket = socket;

  return (
    <Router>
    <div className="App">
      {
        !state.isLogin 
        ? <Login onLogin={onLogin}/>
        : <TextChatRoom {...state} onSetMessage={setNewMessage} leaveRoom={leaveRoom}/>
        }
  </div>
  </Router>
  );
}

export default App;
