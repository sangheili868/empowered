import React, { Component } from 'react'
import EmpIconButton from '../../../EmpIconButton/EmpIconButton'
import { block, title, counter } from './EncounterCombatant.module.scss'

class EncounterCombatantCounter extends Component {

  handleIncrement = () => {
    this.props.onUpdate(`${this.props.field}`, this.props.value + 1)
  }

  handleDecrement = () => {
    this.props.onUpdate(`${this.props.field}`, this.props.value - 1)
  }

  render () {
    return (
      <td className={block}>
        <div className={title}>{this.props.title}</div>
        <div className={counter}>
          {this.props.max > 0 ? (
            <>
              <EmpIconButton
                icon="minus"
                color="warning"
                onClick={this.handleDecrement}
              />
              {this.props.value} / {this.props.max}
              <EmpIconButton
                icon="plus"
                color="success"
                onClick={this.handleIncrement}
              />
            </>
          ) : (
            'None'
          )}
        </div>
      </td>
    )
  }
}

export default EncounterCombatantCounter
