import io from 'socket.io-client';
import './App.css';
import './components/Login/Login'
import Login from './components/Login/Login';

const socket = io();

const App = () => {
  return (
    <div className="App">
       <Login />
    </div>
  );
}

export default App;
