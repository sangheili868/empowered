import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './styles/index.scss';
import './styles/global.scss';
import CharacterPage from './components/pages/Character/CharacterPage'
import IndexPage from './components/pages/Index/IndexPage'
import RulesPage from './components/pages/Rules/RulesPage'
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
        </div>
        <div>
          <Route path="/rules" component={RulesPage}/>
          <Route path="/character" component={CharacterPage}/>
          <Route exact path="/" component={IndexPage}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));
