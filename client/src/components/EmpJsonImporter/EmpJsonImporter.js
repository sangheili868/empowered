import React, { Component } from 'react';
import { importer } from './EmpJsonImporter.module.scss'
import EmpModal from '../EmpModal/EmpModal'

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
    this.setState({ isShowingWarning: false })
  }

  render() {
    return (
      <div className={this.props.className}>
        <EmpModal
          title="Loading Character From File"
          body="Are you sure you want to clear the character data and load another character?"
          controls={[{
            label: 'Confirm',
            onClick: this.openFileDialog
          }]}
          isBlocked={!this.props.isWarning}
          onBlocked={this.openFileDialog}
        >
          Load
        </EmpModal>
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
