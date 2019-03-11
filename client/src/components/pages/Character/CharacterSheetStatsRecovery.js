import React, { Component } from 'react'
import EmpButton from '../../EmpButton/EmpButton';
import { recoveryButton, recoveryImg } from './CharacterPage.module.scss'
import { Modal } from 'react-bootstrap'

class CharacterSheetStatsRecovery extends Component {
  state = {
    isShowingModal: false
  }
  handleToggleModal = () => {
    this.setState({
      isShowingModal: !this.state.isShowingModal
    })
  }
  handleConfirm = () => {
    this.handleToggleModal()
    this.props.onConfirm()
  }
  render () {
    return (
      <>
        <Modal show={this.state.isShowingModal} onHide={this.handleToggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>Take {this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This recovery will take {this.props.duration}. After completing it, you gain
            the following effects:
            <ul>
              {this.props.effects.map(effect =>
                <li key={effect}>{effect}</li>
              )}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <EmpButton onClick={this.handleToggleModal}>Cancel</EmpButton>
            <EmpButton onClick={this.handleConfirm}>Confirm</EmpButton>
          </Modal.Footer>
        </Modal>
        <EmpButton className={recoveryButton} onClick={this.handleToggleModal}>
          {this.props.title}
          <img className={recoveryImg} alt="Rest Icon" src={this.props.icon}/>
        </EmpButton>
      </>
    )
  }
}

export default CharacterSheetStatsRecovery
