import React, { Component } from 'react';
import { importer } from './EmpJsonImporter.module.scss'
import EmpButton from '../EmpButton/EmpButton'
import { Modal } from 'react-bootstrap'

let fileReader
class EmpJsonImporter extends Component {
  state = {
    isShowingWarning: false
  }
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
  handleOpenWarning = () => {
    if (this.props.isWarning) this.setState({isShowingWarning: true})
    else this.openFileDialog()
  }
  handleCloseWarning = () => {
    this.setState({isShowingWarning: false})
  }
  render() {
    return (
      <div className={this.props.className}>
        <EmpButton onClick={this.handleOpenWarning}>Load Character</EmpButton>
        <Modal show={this.state.isShowingWarning} onHide={this.handleCloseWarning}>
          <Modal.Header closeButton>
            <Modal.Title>Loading Character From File</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to clear the character data and load another character?
          </Modal.Body>
          <Modal.Footer>
            <EmpButton onClick={this.handleCloseWarning}>No</EmpButton>
            <EmpButton onClick={this.openFileDialog}>Yes</EmpButton>
          </Modal.Footer>
        </Modal>
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
