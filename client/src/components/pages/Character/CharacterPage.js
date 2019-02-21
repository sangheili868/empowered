import React, { Component } from 'react'
import EmpJsonImporter from '../../EmpJsonImporter'
import CharacterSheet from './CharacterSheet'
import Character from '../../../classes/Character'

class CharacterPage extends Component {
  state = {
    character: null
  };
  handleFileContent = fileContent => {
    this.setState({character: new Character(fileContent)})
  }
  render() {
    return (
      <div>
        <p>Character</p>
        <div>Import Character Sheet</div>
        <EmpJsonImporter onFileOpen={this.handleFileContent}/>
        {this.state.character &&
          <CharacterSheet character={this.state.character}/>
        }
      </div>
    );
  }
}

export default CharacterPage;
