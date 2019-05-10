import React, { Component } from 'react'
import EmpCheckbox from '../EmpCheckbox/EmpCheckbox'
import EmpButton from '../EmpButton/EmpButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { checkboxes, reset } from './EmpActionTracker.module.scss'

class EmpActionTracker extends Component {

  state = {
    isCardinalUsed: false,
    isAction1Used: false,
    isAction2Used: false,
    isReactionUsed: false,
  }

  handleClear = () => {
    this.setState({
      isCardinalUsed: false,
      isAction1Used: false,
      isAction2Used: false,
      isReactionUsed: false,
    })
  }

  get isAnySelected () {
    return this.state.isCardinalUsed ||
      this.state.isAction1Used ||
      this.state.isAction2Used ||
      this.state.isReactionUsed
  }

  render () {
    return (
      <div className={checkboxes}>
        <EmpCheckbox isChecked={this.state.isCardinalUsed} onToggle={isCardinalUsed => this.setState({ isCardinalUsed })}>
          Cardinal:
        </EmpCheckbox>
        <EmpCheckbox isChecked={this.state.isAction1Used} onToggle={isAction1Used => this.setState({ isAction1Used })}>
          Actions:
        </EmpCheckbox>
        <EmpCheckbox isChecked={this.state.isAction2Used} onToggle={isAction2Used => this.setState({ isAction2Used })}/>
        <EmpCheckbox isChecked={this.state.isReactionUsed} onToggle={isReactionUsed => this.setState({ isReactionUsed })}>
          Reaction:
        </EmpCheckbox>
        <EmpButton className={reset} mode="secondary" isDisabled={!this.isAnySelected} onClick={this.handleClear}>
          <FontAwesomeIcon icon="sync-alt"/>
        </EmpButton>
      </div>
    )
  }
}

export default EmpActionTracker
