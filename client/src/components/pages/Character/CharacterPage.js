import React, { Component } from 'react'
import EmpJsonImporter from '../../EmpJsonImporter/EmpJsonImporter'
import EmpJsonExporter from '../../EmpJsonExporter'
import CharacterSheet from './CharacterSheet'
import Character from '../../../classes/Character'
import { Route, Redirect } from 'react-router-dom'
import { merge, cloneDeep, every, has, set } from 'lodash'
import EmpButton from '../../EmpButton/EmpButton';
import newCharacter from '../../../gameData/newCharacter'
import { alert, manageCharacter, saveButton } from './CharacterPage.module.scss'
import { Modal, Alert } from 'react-bootstrap'

class CharacterPage extends Component {
  state = {
    warningState: '',
    isOpeningFile: false
  };
  handleOpenWarning = () => {
    if (this.props.characterData.isDirty) this.setState({warningState: 'create'})
    else this.createNewCharacter()
  }
  handleCloseWarning = () => {
    this.setState({warningState: ''})
  }
  createNewCharacter = () => {
    this.handleCloseWarning()
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
      Single mode: updateCharacter(['stats','tempHP'], 10)
      Multi mode: updateCharacter([
        { path: 'stat.hitPoints', value: 0},
        { path: ['stats', 'tempHP'], value: 0}
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
        <Modal show={this.state.warningState !== ''} onHide={this.handleCloseWarning}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Character</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to clear the character data and load another character?
          </Modal.Body>
          <Modal.Footer>
            <EmpButton onClick={this.handleCloseWarning}>No</EmpButton>
            <EmpButton onClick={this.createNewCharacter}>Yes</EmpButton>
          </Modal.Footer>
        </Modal>
        <div className={manageCharacter}>
          <EmpButton onClick={this.handleOpenWarning}>
            New
          </EmpButton>
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
