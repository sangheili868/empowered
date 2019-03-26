import React, { Component } from 'react'
import { button, primary, secondary, success, warning, text, disabled, noStyle, tr } from './EmpButton.module.scss'

class EmpButton extends Component {

  get containerComponent () {
    return this.props.mode === 'tr' ? 'tr' : 'div'
  }

  get classes () {
    return [
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
  }

  handleClick = event => {
    if (this.props.onClick && !this.props.isDisabled) this.props.onClick(event)
  }

  render () {
    const ContainerComponent = this.containerComponent
    return (
      <ContainerComponent className={this.classes} style={this.props.style} onClick={this.handleClick}>
        {this.props.children}
      </ContainerComponent>
    )
  }
}

export default EmpButton
