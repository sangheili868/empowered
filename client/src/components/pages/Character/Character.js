import React, { Component } from 'react';
import "./character.scss";
import EmpJsonImporter from '../../EmpJsonImporter';

class Character extends Component {
  state = {
    fileContent: null
  };
  handleFileContent = fileContent => {
    this.setState({fileContent})
  }
  render() {
    return (
      <div>
        <p>Character</p>
        <div>Import Character Sheet</div>
        <EmpJsonImporter onFileOpen={this.handleFileContent}/>
        {this.state.fileContent &&  
          <div className="sheet">
            <p>Name: {this.state.fileContent.name}</p>
            <p>Current HP: {this.state.fileContent.curHP}</p>
            <p>Armor: {this.state.fileContent.armorType}</p>
            <p>Weapons:</p>
            <ul>{
              this.state.fileContent.weapons.map((weapon, index) =>
                <li key={index}>{weapon}</li>
              )
            }</ul>
          </div>
        }
      </div>
    );
  }
}

export default Character;
