import React, { Component } from 'react'
import { editor, inputBox, doneButton } from './EmpEditor.module.scss'
import EmpButton from '../EmpButton/EmpButton'

class EmpEditor extends Component {
  state = {
    isEditing: false,
    currentValue: null
  }
  toggleEditing = () => {
    this.setState({
      currentValue: this.props.value,
      isEditing: !this.state.isEditing
    })
  }
  handleChange = ({target}) => {
    this.setState({currentValue: target.value})
  }
  handleDone = () => {
    this.props.onUpdate(this.state.currentValue)
    this.toggleEditing()
  }
  render () {
    return this.state.isEditing ? (
      <div>
        <input
          type="text"
          className={inputBox}
          value={this.state.currentValue}
          onChange={this.handleChange}
        />
        <EmpButton className={doneButton} onClick={this.handleDone}>Done</EmpButton>
        <EmpButton className={doneButton} onClick={this.toggleEditing}>Cancel</EmpButton>
      </div>
    ) : (
      <div className={[this.props.className, editor].join(' ')} onClick={this.toggleEditing}>
        {this.props.value === '' ? 'Click here to edit' : this.props.value}
      </div>
    )
  }
}

export default EmpEditor