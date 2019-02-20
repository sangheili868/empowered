import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './styles/index.scss';
import './styles/global.scss';
import Character from './components/pages/Character/Character'
import Monster from './components/pages/Monster'
import Rules from './components/pages/Rules/Rules'
import Getter from './components/Getter'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="title">Empowered RPG System</div>
        <div className="nav-bar">
          <Link to="/rules"><div className="nav-link">How to Play</div></Link>
          <Link to="/character"><div className="nav-link">Characters</div></Link>
          <Link to="/monster"><div className="nav-link">Monsters</div></Link>
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
