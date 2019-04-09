import React, { Component } from 'react'
import EmpTable from '../../../EmpTable/EmpTable'
import { map, startCase } from 'lodash'
import EmpIconButton from '../../../EmpIconButton/EmpIconButton'

class CreatureAbilityScores extends Component {

  get abilityScores () {
    return map(this.props.abilityScores, (abilityScore, abilityScoreName) => ({
      abilityScoreName,
      displayName: startCase(abilityScoreName),
      ...abilityScore
    }))
  }

  handleIncrement = (ability, score) => {
    this.props.updateCreature(`stats.abilityScores.${ability}`, score + 1, 1)
  }

  handleDecrement = (ability, score) => {
    this.props.updateCreature(`stats.abilityScores.${ability}`, score - 1, -1)
  }

  renderIncrease = index => {
    const { abilityScoreName, value } = this.abilityScores[index]
    return (
      <EmpIconButton color="success" icon="plus" onClick={this.handleIncrement.bind(this, abilityScoreName, value)}/>
    )
  }

  renderDecrease = index => {
    const { abilityScoreName, value } = this.abilityScores[index]
    return (
      <EmpIconButton color="warning" icon="minus" onClick={this.handleDecrement.bind(this, abilityScoreName, value)}/>
    )
  }
  render () {
    return (
      <EmpTable
        title="Ability Scores"
        items={this.abilityScores}
        isHidingColumnNames
        columnNames={{ displayName: 'Ability', displayValue: 'Score' }}
        customFields={[
          {
            title: 'Increase',
            render: this.renderIncrease
          },
          {
            title: 'Decrease',
            render: this.renderDecrease
          }
        ]}
      />
    )
  }
}

export default CreatureAbilityScores
