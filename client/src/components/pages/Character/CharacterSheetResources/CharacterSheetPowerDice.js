import React, { Component } from 'react'
import EmpCard from '../../../EmpCard/EmpCard';
import EmpButton from '../../../EmpButton/EmpButton';
import { range } from 'lodash'
import { dice, button, icon, used } from './CharacterSheetResources.module.scss'

import d4Icon from "../../../../icons/d4.png"
import d6Icon from "../../../../icons/d6.png"
import d8Icon from "../../../../icons/d8.png"
import d10Icon from "../../../../icons/d10.png"
import d12Icon from "../../../../icons/d12.png"

class CharacterSheetPowerDice extends Component {

  get dieIcon () {
    return {
      'd4s': d4Icon,
      'd6s': d6Icon,
      'd8s': d8Icon,
      'd10s': d10Icon,
      'd12s': d12Icon,
    }[this.props.dieSize]
  }

  get highlightedRange () {
    return range(this.props.value)
  }

  get usedRange () {
    return range(this.props.max - this.props.value)
  }

  handleDecrease = () => {
    this.props.onUpdate(this.props.value - 1)
  }

  handleIncrease = () => {
    this.props.onUpdate(this.props.value + 1)
  }

  render () {
    return (
      <div>
        <EmpCard title={'Power ' + this.props.dieSize} isStartingOpen>
          <div className={dice}>
            {this.highlightedRange.map(index =>
              <EmpButton
                key={index}
                mode="primary"
                className={button}
                onClick={this.handleDecrease}
              >
                <img className={icon} alt={this.props.title} src={this.dieIcon}/>
              </EmpButton>
            )}
            {this.usedRange.map(index =>
              <EmpButton
                key={index + this.props.value}
                className={[button, used].join(' ')}
                onClick={this.handleIncrease}
              >
                <img className={icon} alt={this.props.title} src={this.dieIcon}/>
              </EmpButton>
            )}
          </div>
        </EmpCard>
      </div>
    )
  }
}

export default CharacterSheetPowerDice
