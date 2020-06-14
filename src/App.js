import React, {Component} from 'react';
import RouterURL from './RouterURL/RouterURL';
import {BrowserRouter as Router} from 'react-router-dom';

class App extends Component {
  render(){
  return (
    <Router>
      <div className="App" id="App">
        <RouterURL></RouterURL>
      </div>
    </Router>
    );
  }
}

export default App;
