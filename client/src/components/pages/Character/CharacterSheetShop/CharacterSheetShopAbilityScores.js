import React, { Component } from 'react'
import { warning } from './CharacterSheetShop.module.scss'
import { lowerCase } from 'lodash'
import EmpButton from '../../../EmpButton/EmpButton'
import CharacterSheetTable from '../CharacterSheetTable/CharacterSheetTable'

class CharacterSheetShopAbilityScores extends Component {

  handleBuy = score => {
    const isIncreasingHP = ['strong', 'determined'].includes(lowerCase(score.name))
    this.props.updateCharacter([
      { path: 'shop.advancements', value: this.props.advancements - score.cost },
      { path: ['stats', 'abilityScores', lowerCase(score.name)], value: score.value + 1 },
      { path: 'stats.hitPoints', value: this.props.hitPoints + (isIncreasingHP ? 1 : 0) }
    ])
  }

  handleSell = score => {
    const isDecreasingHP = ['strong', 'determined'].includes(lowerCase(score.name))
    this.props.updateCharacter([
      { path: 'shop.advancements', value: this.props.advancements + score.worth },
      { path: ['stats', 'abilityScores', lowerCase(score.name)], value: score.value - 1 },
      { path: 'stats.hitPoints', value: Math.max(0, this.props.hitPoints + (isDecreasingHP ? -1 : 0)) }
    ])
  }

  renderBuyButton = index => {
    const score = this.props.abilityScores[index]
    if (!this.props.unlocked && score.value > 2) {
      return <div className={warning}>At Maximum Starting Value</div>
    } else if (score.value > 4) {
      return <div className={warning}>At Maximum</div>
    } else if (score.cost > this.props.advancements) {
      return <div className={warning}>Costs {score.cost} adv.</div>
    } else {
      return <EmpButton mode="success" onClick={this.handleBuy.bind(this, score)}>-{score.cost} Adv.</EmpButton>
    }
  }

  renderSellButton = index => {
    const score = this.props.abilityScores[index]
    return (score.value <= -2) ? (
      <div className={warning}>At Minimum</div>
    ) : (
      <EmpButton mode="warning" onClick={this.handleSell.bind(this, score)}>+{score.worth} Adv.</EmpButton>
    )
  }

  render () {
    return (
      <CharacterSheetTable
        title="Ability Scores"
        items={this.props.abilityScores}
        columnNames={{ name: 'Name', displayValue: 'Current' }}
        buyButton={this.renderBuyButton}
        sellButton={this.renderSellButton}
      />
    )
  }
}

export default CharacterSheetShopAbilityScores
