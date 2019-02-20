import React, { Component } from 'react';

let fileReader
class EmpJsonImporter extends Component {
  handleNewFile = event => {
    const file = event.target.files[0] 
    fileReader = new FileReader()
    fileReader.onloadend = () => {
      this.props.onFileOpen(JSON.parse(fileReader.result))
    }
    fileReader.readAsText(file)
  }
  render() {
    return (
      <input type="file" name="" id="" accept='.json' onChange={this.handleNewFile}/>
    );
  }
}

export default EmpJsonImporter;
