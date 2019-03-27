import React, { Component } from 'react'
import EmpJsonImporter from '../../EmpJsonImporter/EmpJsonImporter'
import EmpJsonExporter from '../../EmpJsonExporter'
import CharacterSheet from './CharacterSheet'
import Character from '../../../classes/Character'
import { Route, Redirect } from 'react-router-dom'
import { cloneDeep, every, has, set } from 'lodash'
import EmpModal from '../../EmpModal/EmpModal'
import newCharacter from '../../../gameData/newCharacter'
import { alert, saveButton, manageCharacter } from './CharacterPage.module.scss'
import { Alert } from 'react-bootstrap'

class CharacterPage extends Component {

  state = {
    isOpeningFile: false
  }

  createNewCharacter = () => {
    this.loadCharacter(cloneDeep(newCharacter), 'newCharacter.json')
    this.setState({isDirty: true})
  }

  loadCharacter = (baseCharacter, fileName) => {
    this.props.updateCharacter({
      baseCharacter,
      character: new Character(baseCharacter),
      isDirty: false,
      fileName
    })
    this.setState({ isOpeningFile: false })
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
    let baseCharacter = cloneDeep(this.props.characterData.baseCharacter)
    if (isMultiMode) {
      paths.map(({ path, value }) => set(baseCharacter, path, value))
    } else {
     set(baseCharacter, paths, newValue)
    }
    this.props.updateCharacter({
      baseCharacter,
      character: new Character(baseCharacter),
      isDirty: true
    })
  }

  handleSave = () => {
    this.props.updateCharacter({isDirty: false})
  }

  render() {
    return (
      <div>
        {this.props.characterData.isDirty &&
          <Alert className={alert} variant="danger">
            <div>Warning: Your character has unsaved changes!</div>
            <EmpJsonExporter
              className={saveButton}
              content={this.props.characterData.character.exportData}
              fileName={this.props.characterData.fileName}
              onSave={this.handleSave}
            >
              Save
            </EmpJsonExporter>
          </Alert>
        }
        <div className={manageCharacter}>
          <EmpModal
            isBlocked={!this.props.characterData.isDirty}
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
          <EmpJsonImporter isWarning={this.props.characterData.isDirty} onFileOpen={this.loadCharacter}/>
          {this.props.characterData.character && !this.props.characterData.isDirty &&
            <EmpJsonExporter
              content={this.props.characterData.character.exportData}
              fileName={this.props.characterData.fileName}
              onSave={this.handleSave}
            >
              Export
            </EmpJsonExporter>
          }
        </div>
        {this.props.characterData.character &&
          <div>
            <Route exact path='/character' render={() => <Redirect to='/character/bio'/>}/>
            <CharacterSheet
              character={this.props.characterData.character}
              updateCharacter={this.updateCharacter}
            />
          </div>
        }
      </div>
    );
  }
}

export default CharacterPage;
