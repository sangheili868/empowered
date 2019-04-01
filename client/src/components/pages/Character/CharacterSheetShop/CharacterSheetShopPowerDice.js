import React, { Component } from 'react'
import { warningText } from '../CharacterPage.module.scss'
import EmpButton from '../../../EmpButton/EmpButton'
import CharacterSheetTable from '../CharacterSheetTable/CharacterSheetTable'

class CharacterSheetShopPowerDice extends Component {

  handleBuy = die => {
    const smallerDieUpdate = (die.name === 'd4') ? [] : [{
      path: `stats.powerDice.${die.smallerDie}`, value: {
        current: die.smallerDieCount - 1,
        max: die.smallerDieCount - 1
      }
    }]
    this.props.updateCharacter([
      { path: 'shop.advancements', value: this.props.advancements - die.cost },
      { path: `stats.powerDice.${die.name}s`, value: { current: die.current + 1, max: die.current + 1 } },
      ...smallerDieUpdate
    ])
  }

  handleSell = die => {
    const smallerDieUpdate = (die.name === 'd4') ? [] : [{
      path: `stats.powerDice.${die.smallerDie}`, value: {
        current: die.smallerDieCount + 1,
        max: die.smallerDieCount + 1
      }
    }]
    this.props.updateCharacter([
      { path: 'shop.advancements', value: this.props.advancements + die.worth },
      { path: `stats.powerDice.${die.name}s`, value: { current: die.current - 1, max: die.current - 1 } },
      ...smallerDieUpdate
    ])
  }

  renderBuyButton = index => {
    const die = this.props.powerDice[index]
    if (die.smallerDieCount < 1) {
      return <div className={warningText}>No {die.smallerDie}</div>
    } else if (die.cost > this.props.advancements) {
      return <div className={warningText}>Costs {die.cost} adv.</div>
    } else {
      return <EmpButton mode="success" onClick={this.handleBuy.bind(this, die)}>-{die.cost} Adv.</EmpButton>
    }
  }

  renderSellButton = index => {
    const die = this.props.powerDice[index]
    return (die.current === 0) ? (
      <div className={warningText}>At Minimum</div>
    ) : (
      <EmpButton mode="warning" onClick={this.handleSell.bind(this, die)}> +{die.worth} Adv. </EmpButton>
    )
  }

  render () {
    return (
      <CharacterSheetTable
        title="Power Dice"
        items={this.props.powerDice}
        columnNames={{ name: 'Name', current: 'Current' }}
        buyButton={this.renderBuyButton}
        sellButton={this.renderSellButton}
      />
    )
  }
}

export default CharacterSheetShopPowerDice
