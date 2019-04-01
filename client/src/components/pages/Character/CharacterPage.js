import React, { Component } from 'react'
import CharacterSheet from './CharacterSheet'
import Character from '../../../classes/Character'
import { Route, Redirect } from 'react-router-dom'
import { cloneDeep, every, has, set } from 'lodash'
import EmpModal from '../../EmpModal/EmpModal'
import newCharacter from '../../../gameData/newCharacter'
import { alert, manageCharacter } from './CharacterPage.module.scss'
import { Alert } from 'react-bootstrap'
import CharacterLoader from './CharacterLoader'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { Helmet } from 'react-helmet'

class CharacterPage extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor(props) {
    super(props)
    const _id = window.sessionStorage.getItem('sessionId') || props.cookies.get('cookieId')

    this.state = {
      _id,
      baseCharacter: null,
      character: null
    }

    if (_id) {
      fetch('/api/character/read', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id })
      })
        .then(response => response.json())
        .then(results => {
          if (results.error) {
            this.setIdCookie('')
          } else {
            this.handleLoad(results)
          }
        })
    }
  }

  createNewCharacter = () => {
    const baseCharacter = cloneDeep(newCharacter)
    this.setState({
      baseCharacter,
      character: new Character(baseCharacter)
    })
    this.setIdCookie('')
  }

  handleLoad = baseCharacter => {
    this.setState({
      baseCharacter,
      character: new Character(baseCharacter)
    })
    this.setIdCookie(baseCharacter._id)
  }

  setIdCookie = _id => {
    window.sessionStorage.setItem('sessionId', _id)
    this.props.cookies.set('cookieId', _id, { path: '/' })
    this.setState({ _id })
  }

  updateCharacter = (paths, newValue) => {
    /*
      Single mode: updateCharacter('stats.hitPoints', 10)
      Single mode: updateCharacter(['stats','wounds'], 10)
      Multi mode: updateCharacter([
        { path: 'stat.hitPoints', value: 0},
        { path: ['stats', 'wounds'], value: 0}
      ])
    */
    const isMultiMode = every(paths, pathValue => has(pathValue, 'path') && has(pathValue, 'value'))
    let baseCharacter = cloneDeep(this.state.baseCharacter)
    let _id = baseCharacter._id

    if (isMultiMode) {
      paths.map(({ path, value }) => set(baseCharacter, path, value))
    } else {
      set(baseCharacter, paths, newValue)
    }

    if (_id) {
      this.updateCharacterInDatabase({ baseCharacter, _id })
    } else if (baseCharacter.bio.name) {
      this.createCharacterInDatabase(baseCharacter)
    }

    this.setState({
      baseCharacter,
      character: new Character(baseCharacter)
    })
  }

  updateCharacterInDatabase = ({ baseCharacter, _id }) => {
    fetch('/api/character/update', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ character: baseCharacter, _id})
    })
    this.setState(prevState => ({
      ...prevState,
      characterData: {
        ...prevState.characterData
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
    .then(_id => {
      this.setState(prevState => ({
        ...prevState,
        baseCharacter: {
          ...prevState.baseCharacter,
          _id
        }
      }))
      this.setIdCookie(_id)
    })
  }

  get isUnnamedCharacter () {
    return !this.state._id && this.state.character
  }

  get name () {
    return this.state.character && this.state.character.bio.name
  }

  handleDelete = () => {
    this.setState({
      _id: '',
      baseCharacter: null,
      character: null
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.name}</title>
        </Helmet>

        {this.isUnnamedCharacter &&
          <Alert className={alert} variant="danger">
            Warning: Your character will not be saved until it is given a name!
          </Alert>
        }

        <div className={manageCharacter}>
          <EmpModal
            isBlocked={!this.isUnnamedCharacter}
            title="Create New Character"
            body="Are you sure you want to clear the character data and load a new character?"
            closeText="CANCEL"
            controls={[{
              label: 'CONFIRM',
              onClick: this.createNewCharacter
            }]}
            onHide={this.handleCloseWarning}
            onBlocked={this.createNewCharacter}
          >
            New
          </EmpModal>
          <CharacterLoader isUnnamed={this.isUnnamedCharacter} onLoad={this.handleLoad}/>
        </div>
        {this.state.character ? (
          <div>
            <Route exact path='/character' render={() => <Redirect to='/character/bio'/>}/>
            <CharacterSheet
              _id={this.state._id}
              character={this.state.character}
              updateCharacter={this.updateCharacter}
              onDelete={this.handleDelete}
            />
          </div>
        ) : this.state._id && (
          <div>Loading Character...</div>
        )}
      </div>
    );
  }
}

export default withCookies(CharacterPage)
