import React, { Component } from 'react'
import CharacterSheet from './CharacterSheet'
import Character from '../../../classes/Character'
import { Route, Redirect } from 'react-router-dom'
import newCharacter from '../../../gameData/newCharacter'
import EmpDocManager from '../../EmpDocManager/EmpDocManager'
import EmpLoadingDots from '../../EmpLoadingDots/EmpLoadingDots'
import updateDocument from '../../../utils/updateDocument'

class CharacterPage extends Component {

  state = {
    _id: '',
    baseCharacter: null,
    character: null
  }

  handleUpdateBaseCharacter = (baseCharacter) => {
    this.setState({
      baseCharacter,
      character: new Character(baseCharacter)
    })
  }

  handleUpdateId = _id => {
    this.setState({ _id })
  }

  handleUpdateCharacter = async (paths, newValue) => {
    const { baseDocument, _id } = await updateDocument('characters', this.state.baseCharacter, paths, newValue)
    this.handleUpdateBaseCharacter({ ...baseDocument, _id })
    this.handleUpdateId(_id)
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
        <EmpDocManager
          collection="character"
          _id={this.state._id}
          document={this.state.baseCharacter}
          newDocument={newCharacter}
          onUpdateDocument={this.handleUpdateBaseCharacter}
          onUpdateId={this.handleUpdateId}
        />
        {this.state.character ? (
          <div>
            <Route exact path='/character' render={() => <Redirect to='/character/bio'/>}/>
            <CharacterSheet
              _id={this.state._id}
              character={this.state.character}
              updateCharacter={this.handleUpdateCharacter}
              onDelete={this.handleDelete}
            />
          </div>
        ) : this.state._id && (
          <EmpLoadingDots/>
        )}
      </div>
    );
  }
}

export default CharacterPage
