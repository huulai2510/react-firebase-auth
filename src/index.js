import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Edit from './components/Edit';
import Create from './components/Create';
import Show from './components/Show';
import Login from './components/Login';
import Signup from './components/Signup';

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' render={(props) => <App {...props}/> } />
        <Route path='/edit/:id' render={(props) => <Edit {...props}/>} />
        <Route path='/create' render={(props) => <Create {...props}/>} />
        <Route path='/show/:id' render={(props) => <Show {...props}/>} />
        <Route path='/login' render={props => <Login {...props}/>} />
        <Route path='/signup' render={props => <Signup {...props}/>} />
      </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();