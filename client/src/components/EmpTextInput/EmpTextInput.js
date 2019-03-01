import React, { Component } from 'react'
import { input } from './EmpTextInput.module.scss'

class EmpTextInput extends Component {
  render () {
    return (
      <input
        type="text"
        {...this.props}
        className={[this.props.className, input].join(' ')}
      />
    )
  }
}

export default EmpTextInput