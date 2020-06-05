import React, {Component} from 'react';
import RouterURL from './RouterURL/RouterURL';
import {BrowserRouter as Router} from 'react-router-dom';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class App extends Component {
  render(){
  return (
    <Router history={history}>
      <div className="App">
        <RouterURL></RouterURL>
      </div>
    </Router>
    );
  }
}

export default App;
