import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.scss'
import './styles/index.scss';
import CharacterPage from './components/pages/Character/CharacterPage'
import IndexPage from './components/pages/Index/IndexPage'
import RulesPage from './components/pages/Rules/RulesPage'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill';
import { BrowserRouter as Router } from 'react-router-dom'
import EmpNavigator from './components/EmpNavigator/EmpNavigator'
import { library } from '@fortawesome/fontawesome-svg-core'
import fontAwesomeIcons from './icons/fontAwesomeIcons'

library.add(fontAwesomeIcons)

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="title">Empowered RPG System</div>
        <EmpNavigator routes={[
          {
            label: 'Home',
            route: '/',
            exact: true,
            component: IndexPage
          },
          {
            label: 'How to Play',
            route: '/rules',
            component: RulesPage
          },
          {
            label: 'Characters',
            route: '/character',
            component: CharacterPage
          }
        ]}/>
      </div>
    );
  }
}

ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));
