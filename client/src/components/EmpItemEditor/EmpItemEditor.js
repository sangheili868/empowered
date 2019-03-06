import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  input,
  button,
  plus,
  pen,
  inline,
  field,
  fieldLabel
} from './EmpItemEditor.module.scss'
import { Modal } from 'react-bootstrap'
import EmpButton from '../EmpButton/EmpButton'
import EmpTextInput from '../EmpTextInput/EmpTextInput'
import EmpDropdown from '../EmpDropdown/EmpDropdown'
import { cloneDeep, startCase, map, merge, mapValues, isObject } from 'lodash'

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
  chooseTitle = (value) => {
    if (value.value && !Array.isArray(value.value)) {
      return value.default.find(item => item.value === value.value).text
    } else {
      return 'Choose one'
    }
  }
  handleChange = (key, {target}) => {
    const newValue = isObject(this.state.workingValues[key].default) ? { value: target.value } : target.value
    this.setState(prevState => merge(prevState, {
      workingValues: { [key]: newValue }
    }))
  }
  handleDone = () => {
    this.props.onUpdate(mapValues(this.state.workingValues, value => isObject(value) ? value.value : value))
    this.toggleEditing()
  }
  handleDelete = () => {
    this.toggleEditing()
    this.props.onDelete()
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
                {Array.isArray(value.default) ? (
                  <EmpDropdown
                    title={this.chooseTitle(value)}
                    items={value.default}
                    onSelect={newValue => this.handleChange(key, {target: { value: newValue}})}
                  />
                ) : (
                  <EmpTextInput
                    type="text"
                    className={input}
                    value={isObject(value) ? value.value : value}
                    onChange={this.handleChange.bind(this, key)}
                    onKeyPress={this.handleKeyPress}
                  />
                )}
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <EmpButton onClick={this.toggleEditing}>Cancel</EmpButton>
            {this.props.isDeletable && 
              <EmpButton onClick={this.handleDelete}>Delete</EmpButton>
            }
            <EmpButton onClick={this.handleDone}>Done</EmpButton>
          </Modal.Footer>
        </Modal>
        {this.props.isInline || this.props.isCustomInline ? (
          <div className={this.props.isInline ? inline : ''} onClick={this.toggleEditing}>
            {this.props.children}
          </div>
        ) : (
          <FontAwesomeIcon
            className={[button, (this.props.isEdit ? pen : plus)].join(' ')}
            icon={this.props.isEdit ? 'pen-square' : 'plus-square'}
            onClick={this.toggleEditing}
          />
        )}
      </span>
    )
  }
}

export default EmpItemEditor