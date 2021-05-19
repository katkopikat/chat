import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login'
import TextChatRoom from'./components/TextChatRoom/TextChatRoom'

const App = () => {
  return (
    <div className="App">
    <Router>
    <Switch>
      <Route path='/' exact component={Login} />
      <Route path='/room' component={TextChatRoom} />
    </Switch>
   
    </Router>
  </div>
  );
}

export default App;
