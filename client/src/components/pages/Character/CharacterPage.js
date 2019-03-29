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

class CharacterPage extends Component {

  createNewCharacter = () => {
    const baseCharacter = cloneDeep(newCharacter)
    this.props.updateCharacter({
      baseCharacter,
      character: new Character(baseCharacter),
      isUnnamed: true,
    })
  }

  handleLoad = baseCharacter => {
    this.props.updateCharacter({
      baseCharacter,
      character: new Character(baseCharacter),
    })
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
      character: new Character(baseCharacter)
    })
  }

  render() {
    return (
      <div>
        {this.props.characterData.isUnnamed &&
          <Alert className={alert} variant="danger">
            Warning: Your character will not be saved until it is given a name!
          </Alert>
        }
        <div className={manageCharacter}>
          <EmpModal
            isBlocked={!this.props.characterData.isUnnamed}
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
          <CharacterLoader isUnnamed={this.props.characterData.isUnnamed} onLoad={this.handleLoad}/>
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
