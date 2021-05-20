import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useEffect, useReducer } from 'react';
import './App.css';
import Login from './components/Login/Login'
import TextChatRoom from'./components/TextChatRoom/TextChatRoom'
import socket from './socket';
import reducer from './reducer'

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    isLogin: false,
    roomId: null,
    userName: null,
  });

  const onLogin = async (data) => {
    dispatch({
      type: 'JOINED',
      payload: data,
    });
    socket.emit('ROOM:JOIN', data);
  }

  useEffect(() => {
    socket.on('ROOM:JOINED', (users) => {
      console.log('NEW USER', users)
    })
  }, [])

  window.socket = socket;

  return (
    <div className="App">
    <Router>
    <Switch>
      <Route path='/' exact render={() => !state.joined && <Login onLogin={onLogin}/> } />
      <Route path='/room' render={() => <TextChatRoom room='13'/> } />
      {/* <Route path='/room' component={TextChatRoom} /> */}
    </Switch>
   
    </Router>
  </div>
  );
}

export default App;
