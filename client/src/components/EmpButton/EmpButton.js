import React, { Component } from 'react'
import { button } from './EmpButton.module.scss'

class EmpButton extends Component {
  handleClick = event => {
    if (this.props.onClick) this.props.onClick(event)
  }
  render () {
    return (
      <button
        type="button"
        className={[button, this.props.className].join(' ')}
        onClick={this.handleClick}
      >
        {this.props.children}
      </button>
    )
  }
}

export default EmpButton