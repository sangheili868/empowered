import React, { Component } from 'react'
import { button, primary, secondary, success, warning, text, disabled, noStyle, tr } from './EmpButton.module.scss'

class EmpButton extends Component {
  handleClick = event => {
    if (this.props.onClick && !this.props.isDisabled) this.props.onClick(event)
  }
  classes = [
    button,
    this.props.className,
    this.props.isDisabled ? disabled : '',
    {
      primary,
      secondary,
      success,
      warning,
      text,
      noStyle,
      tr,
    }[this.props.mode] || ''
  ].join(' ')

  render () {
    const ContainerComponent = this.props.mode === 'tr' ? 'tr' : 'div'
    return (
      <ContainerComponent className={this.classes} style={this.props.style} onClick={this.handleClick}>
        {this.props.children}
      </ContainerComponent>
    )
  }
}

export default EmpButton
