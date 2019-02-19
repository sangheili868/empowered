import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './index.css';
import Getter from './components/Getter'
import Poster from './components/Poster'

class App extends Component {
    render() {
      return (
        <div className="App">
          <Getter />
          <Poster />
        </div>
      );
    }
  }

ReactDOM.render(<App />, document.getElementById('root'));
