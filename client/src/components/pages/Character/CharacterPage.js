import React, { Component } from 'react'
import EmpJsonImporter from '../../EmpJsonImporter/EmpJsonImporter'
import EmpJsonExporter from '../../EmpJsonExporter'
import CharacterSheet from './CharacterSheet'
import Character from '../../../classes/Character'
import { Route, Redirect } from 'react-router-dom'
import { merge } from 'lodash'
import EmpButton from '../../EmpButton/EmpButton';
import newCharacter from '../../../gameData/newCharacter'
import { manageCharacter, manageCharacterButton } from './CharacterPage.module.scss'

class CharacterPage extends Component {
  state = {
    baseCharacter: null,
    character: null,
    isDirty: false,
    fileName: ''
  };
  createNewCharacter = () => {
    this.loadCharacter(newCharacter, 'newCharacter.json')
  }
  loadCharacter = (baseCharacter, fileName) => {
    this.setState({
      baseCharacter,
      character: new Character(baseCharacter),
      isDirty: false,
      fileName
    })
  }
  updateCharacter = newData => {
    this.setState({
      character: new Character(merge(
        this.state.baseCharacter,
        newData
      )),
      isDirty: true
    })
  }
  handleSave = () => {
    this.setState({isDirty: false})
  }
  render() {
    return (
      <div>
        {this.state.isDirty && 
          <div>YOUR CHARACTER HAS UNSAVED CHANGES</div>
        }
        <div className={manageCharacter}>
          <EmpButton className={manageCharacterButton} onClick={this.createNewCharacter}>
            New Character
          </EmpButton>
          <EmpJsonImporter className={manageCharacterButton} onFileOpen={this.loadCharacter}/>
          {this.state.character &&
            <EmpJsonExporter
              className={manageCharacterButton} 
              content={this.state.character.exportData}
              fileName={this.state.fileName}
              onSave={this.handleSave}
            >
              Save Character
            </EmpJsonExporter>
          }
        </div>
        {this.state.character &&
          <div>
            <Route exact path='/character' render={() => <Redirect to='/character/bio'/>}/>
            <CharacterSheet
              character={this.state.character}
              onUpdate={this.updateCharacter}
            />
          </div>
        }
      </div>
    );
  }
}

export default CharacterPage;
