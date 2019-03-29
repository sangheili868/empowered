import ReactDOM from 'react-dom';
import React, { Component } from 'react';
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

  state = {
    characterData: {
      baseCharacter: null,
      character: null,
      isUnnamed: false
    }
  }

  updateCharacterInDatabase = data => {
    fetch('/api/character/update', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    this.setState(prevState => ({
      ...prevState,
      characterData: {
        ...prevState.characterData,
        isUnnamed: false
      }
    }))
  }

  createCharacterInDatabase = character => {
    fetch('/api/character/create', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ character })
    })
    .then(response => response.json())
    .then(newId => {
      this.setState(prevState => ({
        ...prevState,
        characterData: {
          ...prevState.characterData,
          baseCharacter: {
            ...prevState.characterData.baseCharacter,
            _id: newId
          },
          isUnnamed: false
        }
      }))
    })
  }

  updateCharacter = newCharacterData => {
    const character = newCharacterData.baseCharacter
    const _id = character._id

    if (_id) {
      this.updateCharacterInDatabase({ character, _id })
    } else if (character.bio.name) {
      this.createCharacterInDatabase(character)
    }

    this.setState(prevState => ({
      ...prevState,
      characterData: {
        ...prevState.characterData,
        ...newCharacterData
      }
    }))
  }

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
            label: 'Character',
            route: '/character',
            component: CharacterPage,
            props: {
              characterData: this.state.characterData,
              updateCharacter: this.updateCharacter
            }
          }
        ]}/>
      </div>
    );
  }
}

ReactDOM.render(<Router><App/></Router>, document.getElementById('root'));
