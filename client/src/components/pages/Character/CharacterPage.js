import React, { Component } from 'react'
import EmpJsonImporter from '../../EmpJsonImporter/EmpJsonImporter'
import EmpJsonExporter from '../../EmpJsonExporter'
import CharacterSheet from './CharacterSheet'
import Character from '../../../classes/Character'
import { Route, Redirect } from 'react-router-dom'
import { merge, cloneDeep } from 'lodash'
import EmpButton from '../../EmpButton/EmpButton';
import newCharacter from '../../../gameData/newCharacter'
import { manageCharacter, manageCharacterButton } from './CharacterPage.module.scss'
import { Modal, Alert } from 'react-bootstrap'

class CharacterPage extends Component {
  state = { 
    baseCharacter: null,
    character: null,
    isDirty: false,
    fileName: '',
    warningState: '',
    isOpeningFile: false
  };
  handleOpenWarning = () => {
    if (this.state.isDirty) this.setState({warningState: 'create'})
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
    this.setState({
      baseCharacter,
      character: new Character(baseCharacter),
      isDirty: false,
      fileName,
      isOpeningFile: false
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
        <Alert show={this.state.isDirty} variant="danger">
          <div>Warning: Your character has unsaved changes!</div>
        </Alert>
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
          <EmpButton className={manageCharacterButton} onClick={this.handleOpenWarning}>
            New Character
          </EmpButton>
          <EmpJsonImporter
            className={manageCharacterButton} 
            isWarning={this.state.isDirty}
            onFileOpen={this.loadCharacter}
          />
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
