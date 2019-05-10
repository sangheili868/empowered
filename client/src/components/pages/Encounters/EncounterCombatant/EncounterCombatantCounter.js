import React, { Component } from 'react'
import EmpIconButton from '../../../EmpIconButton/EmpIconButton'
import { block, title, counter } from './EncounterCombatant.module.scss'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
class EncounterCombatantCounter extends Component {

  handleIncrement = amount => {
    const increase = parseInt(amount.increaseBy) || 1
    this.props.onUpdate(`${this.props.field}`, this.props.value + increase)
  }

  handleDecrement = amount => {
    const reduction = parseInt(amount.decreaseBy) * -1 || -1
    this.props.onUpdate(`${this.props.field}`, this.props.value + reduction)
  }

  render () {
    return (
      <td className={block}>
        <div className={title}>{this.props.title}</div>
        <div className={counter}>
          {this.props.max > 0 ? (
            <>
              {this.props.isInputModal ? (
                <EmpItemEditor
                  title={'Decrease ' + this.props.title}
                  mode="noStyle"
                  fields={{ decreaseBy: { validation: 'positive' } }}
                  onSave={this.handleDecrement}
                  saveLabel="CONFIRM"
                >
                  <EmpIconButton icon="minus" color="warning" />
                </EmpItemEditor>
              ) : (
                <EmpIconButton icon="minus" color="warning" onClick={this.handleDecrement}/>
              )}
              {this.props.value} / {this.props.max}

              {this.props.isInputModal ? (
                <EmpItemEditor
                  title={'Increase ' + this.props.title}
                  mode="noStyle"
                  fields={{ increaseBy: { validation: 'positive' } }}
                  onSave={this.handleIncrement}
                  saveLabel="CONFIRM"
                >
                  <EmpIconButton icon="plus" color="success" />
                </EmpItemEditor>
              ) : (
                <EmpIconButton icon="plus" color="success" onClick={this.handleIncrement}/>
              )}
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
