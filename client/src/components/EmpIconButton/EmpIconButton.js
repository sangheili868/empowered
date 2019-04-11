import React, { Component } from 'react'
import {
  layers,
  squareBehind,
  iconButton,
  primary,
  secondary,
  success,
  warning,
  normal,
  disabled,
  edit
} from './EmpIconButton.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class EmpIconButton extends Component {

  get icon () {
    return {
      plus: 'plus-square',
      minus: 'minus-square',
      check: 'check-square',
      square: 'square',
      'open-square': ['far', 'square'],
      pen: 'pen-square',
      open: 'external-link-alt'
    }[this.props.icon]
  }

  get color () {
    return {
      primary,
      secondary,
      success,
      warning,
      normal,
      disabled,
      edit
    }[this.props.color]
  }

  get classes () {
    return [
      iconButton,
      this.color
    ].join(' ')
  }

  render () {
    return (
      <div className={['fa-layers', layers, this.props.className].join(' ')} onClick={this.props.onClick}>
        <FontAwesomeIcon className={squareBehind} icon={['fas', 'square']}/>
        <FontAwesomeIcon className={this.classes} icon={this.icon}/>
      </div>
    )
  }
}

export default EmpIconButton
