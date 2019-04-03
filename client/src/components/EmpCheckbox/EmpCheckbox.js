import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { layers, check, checked, disabled, squareBehind } from './EmpCheckbox.module.scss'

class EmpCheckbox extends Component {

  get classes () {
    return [
      check,
      ...(this.props.isChecked ? [checked] : []),
      ...(this.props.isDisabled ? [disabled] : [])
    ].join(' ')
  }

  get icon () {
    const squareStyle = this.props.isDisabled ? 'fas' : 'far'
    return this.props.isChecked ? [ 'fas', 'check-square'] : [ squareStyle, 'square' ]
  }

  handleClick = event => {
    event.stopPropagation()
    if (!this.props.isDisabled) this.props.onToggle(!this.props.isChecked)
  }

  render () {
    return (
      <div className={['fa-layers', layers].join(' ')} onClick={this.handleClick}>
        <FontAwesomeIcon className={squareBehind} icon={['fas', 'square']}/>
        <FontAwesomeIcon className={this.classes} icon={this.icon} />
      </div>
    )
  }
}

export default EmpCheckbox
