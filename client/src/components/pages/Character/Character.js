import React, { Component } from 'react'
import "./character.scss"
import EmpJsonImporter from '../../EmpJsonImporter'
import CharacterSheet from './CharacterSheet'
class Character extends Component {
  state = {
    character: null
  };
  handleFileContent = fileContent => {
    this.setState({character: fileContent})
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

export default Character;
