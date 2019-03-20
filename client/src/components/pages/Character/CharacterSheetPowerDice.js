import React, { Component } from 'react'
import EmpCard from '../../EmpCard/EmpCard';
import EmpButton from '../../EmpButton/EmpButton';
import { range } from 'lodash'
import { dice, button, icon, used } from './CharacterPage.module.scss'

class CharacterSheetPowerDice extends Component {
  render () {
    return (
      <div>
        <EmpCard title={this.props.title} isStartingOpen>
          <div className={dice}>
            {range(this.props.value).map(index =>
              <EmpButton
                key={index}
                mode="primary"
                className={button}
                onClick={this.props.onUpdate.bind(this, this.props.value - 1)}
              >
                <img className={icon} alt={this.props.title} src={this.props.icon}/>
              </EmpButton>
            )}
            {range(this.props.max - this.props.value).map(index =>
              <EmpButton
                key={index + this.props.value}
                className={[button, used].join(' ')}
                onClick={this.props.onUpdate.bind(this, this.props.value + 1)}
              >
                <img className={icon} alt={this.props.title} src={this.props.icon}/>
              </EmpButton>
            )}
          </div>
        </EmpCard>
      </div>
    )
  }
}

export default CharacterSheetPowerDice
