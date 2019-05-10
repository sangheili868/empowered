import React, { Component } from 'react'
import { checkbox } from './EmpCheckbox.module.scss'
import EmpIconButton from '../EmpIconButton/EmpIconButton'

class EmpCheckbox extends Component {

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
      <div className={checkbox}>
        { this.props.children }
        <EmpIconButton color={this.icon.color} icon={this.icon.icon} onClick={this.handleClick}/>
      </div>
    )
  }
}

export default EmpCheckbox
