import React, { Component } from 'react'
import { footer, closer, opener } from './EmpModal.module.scss'
import { Modal } from 'react-bootstrap'
import EmpButton from '../EmpButton/EmpButton'

class EmpModal extends Component {
  state = {
    isOpen: false
  }
  toggleModal = () => {
    if (this.props.isBlocked) this.props.onBlocked()
    else this.setState(prevState => ({ ...prevState, isOpen: !prevState.isOpen }))
  }
  handleCloser = callback => {
    this.toggleModal()
    callback()
  }
  render () {
    const ContainerComponent = this.props.containerComponent === 'button' ? EmpButton : (
      this.props.containerComponent || 'div'
    )
    return (
      <>
        <Modal show={this.state.isOpen} backdrop={this.props.backdrop} onHide={this.toggleModal}>
          <Modal.Header closeButton><Modal.Title>{this.props.title}</Modal.Title></Modal.Header>
          <Modal.Body>{this.props.body}</Modal.Body>
          <Modal.Footer className={footer}>
            <EmpButton className={closer} onClick={this.toggleModal}>Close</EmpButton>
            {this.props.controls && this.props.controls.map(({ label, isHidden, onClick}) => !isHidden &&
              <EmpButton key={label} className={closer} onClick={this.handleCloser.bind(this, onClick)}>
                {label}
              </EmpButton>
            )}
          </Modal.Footer>
        </Modal>
        <ContainerComponent
          className={[ this.props.className, this.props.noStyle ? '' : opener].join(' ')}
          onClick={this.toggleModal}
        >
          {this.props.children}
        </ContainerComponent>
      </>
    )
  }
}

export default EmpModal
