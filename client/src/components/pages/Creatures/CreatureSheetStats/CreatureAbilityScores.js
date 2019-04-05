import React, { Component } from 'react'
import { control, plus, minus } from './CreatureSheetStats.module.scss'
import CharacterSheetTable from '../../Character/CharacterSheetTable/CharacterSheetTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { map, startCase } from 'lodash'

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
      <FontAwesomeIcon
        className={[control, plus].join(' ')}
        onClick={this.handleIncrement.bind(this, abilityScoreName, value)}
        icon="plus-square"
      />
    )
  }

  renderDecrease = index => {
    const { abilityScoreName, value } = this.abilityScores[index]
    return (
      <FontAwesomeIcon
        className={[control, minus].join(' ')}
        onClick={this.handleDecrement.bind(this, abilityScoreName, value)}
        icon="minus-square"
      />
    )
  }
  render () {
    return (
      <CharacterSheetTable
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
