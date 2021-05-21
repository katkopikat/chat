import { useEffect, useReducer } from 'react';
import './App.css';
import Login from './components/Login/Login'
import TextChatRoom from'./components/TextChatRoom/TextChatRoom'
import socket from './socket';
import reducer from './reducer'
import axios from 'axios';

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    isLogin: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  });

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });

    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };


  const setOnlineUsers = (users) => {
    dispatch({
      type: 'SET_ONLINE_USERS',
      payload: users,
    });
  };

  const setNewMessage = (msgs) => {
    dispatch({
      type: 'SET_NEW_MESSAGE',
      payload: msgs,
    });
  };

  useEffect(() => {
    socket.on('ROOM:SET_ONLINE_USERS', setOnlineUsers);
    socket.on('ROOM:SET_NEW_MESSAGE', setNewMessage);
  }, [])

  window.socket = socket;

  return (
    <div className="App">
      {
        !state.isLogin 
        ? <Login onLogin={onLogin}/>
        : <TextChatRoom {...state} onSetMessage={setNewMessage}/>
        }
  </div>
  );
}

export default App;
