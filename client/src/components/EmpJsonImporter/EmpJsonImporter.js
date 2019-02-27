import React, { Component } from 'react';
import { importer } from './EmpJsonImporter.module.scss'
import EmpButton from '../EmpButton/EmpButton'

let fileReader
class EmpJsonImporter extends Component {
  handleNewFile = ({ target }) => {
    const file = target.files[0] 
    fileReader = new FileReader()
    fileReader.onloadend = () => {
      this.props.onFileOpen(JSON.parse(fileReader.result), file.name)
      document.getElementById('importer').value = ''
    }
    fileReader.readAsText(file)
  }
  openFileDialog = () => {
    document.getElementById('importer').click()
  }
  render() {
    return (
      <div className={this.props.className}>
        <EmpButton onClick={this.openFileDialog}>Load Character</EmpButton>
        <input
          id="importer"
          type="file"
          name=""
          accept='.json'
          className={importer}
          onChange={this.handleNewFile}
        />
      </div>
    );
  }
}

export default EmpJsonImporter;
