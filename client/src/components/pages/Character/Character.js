import React, { Component } from 'react';
import "./character.scss";
import EmpJsonImporter from '../../EmpJsonImporter';

let fileReader
class Character extends Component {
  state = {
    file: null,
    fileContent: null
  };
  handleFileRead = event => {
    const fileContent = JSON.parse(fileReader.result); 
    this.setState({fileContent})
  }

  handleNewFile = event => {
    const file = event.target.files[0] 
    this.setState({file})
    fileReader = new FileReader();
    fileReader.onloadend = this.handleFileRead
    fileReader.readAsText(file)
  }
  render() {
    return (
      <div>
        <p>Character</p>
        <div>Import Character Sheet</div>
        <EmpJsonImporter/>
        <input type="file" name="" id="" accept='.json' onChange={this.handleNewFile}/>
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
