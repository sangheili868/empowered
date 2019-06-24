import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import './styles/global.scss'
import IndexPage from './components/pages/Index/IndexPage'
import RulesPage from './components/pages/Rules/RulesPage'
import CharacterPage from './components/pages/Character/CharacterPage'
import CreaturesPage from './components/pages/Creatures/CreaturesPage'
import EncountersPage from './components/pages/Encounters/EncountersPage'
import FeaturesPage from './components/pages/Features/FeaturesPage'
import 'whatwg-fetch'
import 'promise-polyfill/src/polyfill'
import { BrowserRouter as Router } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import EmpNavigator from './components/EmpNavigator/EmpNavigator'
import { library } from '@fortawesome/fontawesome-svg-core'
import fontAwesomeIcons from './icons/fontAwesomeIcons'
import EmpTitle from './components/EmpTitle/EmpTitle'

library.add(fontAwesomeIcons)

class App extends Component {

  render() {
    return (
      <div className="App">
        <EmpTitle/>
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
            label: 'Character',
            route: '/character',
            component: CharacterPage
          },
          {
            label: 'Creatures',
            route: '/creatures',
            component: CreaturesPage
          },
          {
            label: 'Encounters',
            route: '/encounters',
            component: EncountersPage
          },
          {
            label: 'Features',
            route: '/features/',
            component: FeaturesPage
          }
        ]}/>
      </div>
    )
  }
}

ReactDOM.render((
  <Router><CookiesProvider><App/></CookiesProvider></Router>
), document.getElementById('root'))
