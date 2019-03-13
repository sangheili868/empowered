import React, { Component } from 'react'
import { input } from './EmpTextInput.module.scss'

class EmpTextInput extends Component {
  render () {
    return (
      <textarea
        rows="1"
        {...this.props}
        className={[this.props.className, input].join(' ')}
      />
    )
  }
}

export default EmpTextInput
