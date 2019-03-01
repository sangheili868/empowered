import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { input, button, plus, pen, field, fieldLabel } from './EmpItemEditor.module.scss'
import { Modal } from 'react-bootstrap'
import EmpButton from '../EmpButton/EmpButton'
import EmpTextInput from '../EmpTextInput/EmpTextInput'
import { cloneDeep, startCase, map } from 'lodash'

class EmpItemEditor extends Component {
  state = {
    isShowingModal: false,
    workingValues: {}
  }
  toggleEditing = () => {
    this.setState({
      workingValues: cloneDeep(this.props.fields),
      isShowingModal: !this.state.isShowingModal
    })
  }
  handleChange = (key, {target}) => {
    this.setState(prevState => ({
      ...prevState,
      workingValues: {
        ...prevState.workingValues,
        [key]: target.value
      }
    }))
  }
  handleDone = () => {
    this.props.onUpdate(this.state.workingValues)
    this.toggleEditing()
  }
  handleKeyPress = e => {
    if (e.key === 'Enter') this.handleDone()
  }
  render () {
    return (
      <span>
        <Modal show={this.state.isShowingModal} onHide={this.toggleEditing}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {map(this.state.workingValues, (value, key) => 
              <div className={field} key={key}>
                <div className={fieldLabel}>{startCase(key)}</div>
                <EmpTextInput
                  type="text"
                  className={input}
                  value={value}
                  onChange={this.handleChange.bind(this, key)}
                  onKeyPress={this.handleKeyPress}
                />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <EmpButton onClick={this.toggleEditing}>Cancel</EmpButton>
            <EmpButton onClick={this.handleDone}>Done</EmpButton>
          </Modal.Footer>
        </Modal>
        <FontAwesomeIcon
          className={[button, (this.props.isEdit ? pen : plus)].join(' ')}
          icon={this.props.isEdit ? 'pen-square' : 'plus-square'}
          onClick={this.toggleEditing}
        />
      </span>
    )
  }
}

export default EmpItemEditor