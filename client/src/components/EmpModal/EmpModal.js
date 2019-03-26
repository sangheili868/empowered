import React, { Component } from 'react'
import { title, footer, closer } from './EmpModal.module.scss'
import { Modal } from 'react-bootstrap'
import EmpButton from '../EmpButton/EmpButton'
import { pick } from 'lodash'

class EmpModal extends Component {

  state = {
    isOpen: false
  }

  componentDidMount () {
    this.props.setToggler && this.props.setToggler(this.toggleModal)
  }

  toggleModal = () => {
    if (this.props.isBlocked) this.props.onBlocked()
    else {
      this.state.isOpen ? this.props.onClose && this.props.onClose() : this.props.onOpen && this.props.onOpen()
      this.setState(prevState => ({ ...prevState, isOpen: !prevState.isOpen }))
    }
  }

  handleCloser = callback => {
    this.toggleModal()
    callback()
  }
  
  render () {
    return (
      <>
        <Modal show={this.state.isOpen} backdrop={this.props.backdrop} onHide={this.toggleModal}>
          <Modal.Header className={title} closeButton><Modal.Title>{this.props.title}</Modal.Title></Modal.Header>
          <Modal.Body>{this.props.body}</Modal.Body>
          <Modal.Footer className={footer}>
            <EmpButton className={closer} mode='text' onClick={this.toggleModal}>
              {this.props.closeText || 'CLOSE'}
            </EmpButton>
            {this.props.controls && this.props.controls.map(({ label, isHidden, mode, onClick }) => !isHidden &&
              <EmpButton
                key={label}
                className={closer}
                mode={mode}
                onClick={this.handleCloser.bind(this, onClick)}
              >
                {label}
              </EmpButton>
            )}
          </Modal.Footer>
        </Modal>
        <EmpButton
          {...pick(this.props, ['mode', 'isDisabled', 'children', 'className', 'style'])}
          onClick={this.toggleModal}
        />
      </>
    )
  }
}

export default EmpModal
