import React, { Component } from 'react'
import { layers, check, checked, disabled, squareBehind } from './EmpCheckbox.module.scss'
import EmpIconButton from '../EmpIconButton/EmpIconButton'

class EmpCheckbox extends Component {

  get classes () {
    return [
      check,
      ...(this.props.isChecked ? [checked] : []),
      ...(this.props.isDisabled ? [disabled] : [])
    ].join(' ')
  }

  get icon () {
    const squareStyle = this.props.isDisabled ? {
      color: 'disabled',
      icon: 'square'
    } : {
      color: 'normal',
      icon: 'open-square'
    }
    return this.props.isChecked ? {
      color: 'primary',
      icon: 'check'
    } : squareStyle
  }

  handleClick = event => {
    event.stopPropagation()
    if (!this.props.isDisabled) this.props.onToggle(!this.props.isChecked)
  }

  render () {
    return (
      <EmpIconButton color={this.icon.color} icon={this.icon.icon} onClick={this.handleClick}/>
    )
  }
}

export default EmpCheckbox
