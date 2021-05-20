import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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

  const setOnlineUsers = (users) => {
    dispatch({
      type: 'SET_ONLINE_USERS',
      payload: users,
    });
  };

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


  useEffect(() => {
    //socket.on('ROOM:JOINED', setOnlineUsers)
    socket.on('ROOM:SET_ONLINE_USERS', setOnlineUsers);
  }, [])

  window.socket = socket;

  return (
    <div className="App">
    <Router>
    <Switch>
      <Route path='/' exact render={() => !state.joined
                                          ? <Login onLogin={onLogin}/>
                                          : <TextChatRoom room={state.roomId} users={state.users} /> } />
      {/* <Route path='/room' render={() => <TextChatRoom room={state.roomId} users={state.users} /> } /> */}
      {/* <Route path='/room' component={TextChatRoom} /> */}
    </Switch>
   
    </Router>
  </div>
  );
}

export default App;
