import React, { Component } from 'react'
import { editor, editing, input, doneButton } from './EmpStringEditor.module.scss'
import EmpButton from '../EmpButton/EmpButton'
import EmpTextInput from '../EmpTextInput/EmpTextInput'

class EmpStringEditor extends Component {

  state = {
    isEditing: false,
    workingValue: null
  }

  get value () {
    return this.props.value === '' ? 'Click here to edit' : this.props.value
  }

  toggleEditing = () => {
    this.setState({
      workingValue: this.props.value,
      isEditing: !this.state.isEditing
    })
  }

  handleChange = ({target}) => {
    this.setState({workingValue: target.value})
  }

  handleDone = () => {
    this.props.onSave(this.state.workingValue)
    this.toggleEditing()
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') this.handleDone()
  }

  render () {
    return this.state.isEditing ? (
      <div className={editing}>
        <EmpTextInput
          autoFocus
          className={input}
          value={this.state.workingValue}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onBlur={this.handleDone}
        />
        <div>
          <EmpButton className={doneButton} onClick={this.handleDone}>Done</EmpButton>
          <EmpButton className={doneButton} onClick={this.toggleEditing}>Cancel</EmpButton>
        </div>
      </div>
    ) : (
      <div className={[this.props.className, editor].join(' ')} onClick={this.toggleEditing}>
        {this.value}
      </div>
    )
  }
}

export default EmpStringEditor
