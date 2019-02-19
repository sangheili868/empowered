import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './styles/index.scss';
import './styles/global.scss';
import Character from './components/pages/Character'
import Monster from './components/pages/Monster'
import Rules from './components/pages/Rules'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="title">Empowered RPG System</div>
        <div className="nav-bar">
          <div className="nav-link"><Link to="/rules">How to Play</Link></div>
          <div className="nav-link"><Link to="/character">Characters</Link></div>
          <div className="nav-link"><Link to="/monster">Monsters</Link></div>
        </div>
        <div>
          <Route path="/rules" component={Rules}/>
          <Route path="/character" component={Character}/>
          <Route path="/monster" component={Monster}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));
