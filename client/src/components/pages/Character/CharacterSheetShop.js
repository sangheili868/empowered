import React, { Component } from 'react'
import CharacterSheetStatsTable from './CharacterSheetStatsTable'

class CharacterSheetShop extends Component {

  render () {
    return (
      <div>
        Advancements: {this.props.shop.advancements}
        <CharacterSheetStatsTable
          title="Ability Scores"
          items={this.props.shop.abilityScores}
          columnNames={{
            name: 'Name',
            current: 'Current Value',
            cost: 'Cost to Increase',
            new: 'New Value'
          }}
        />
        <CharacterSheetStatsTable
          title="Power Dice"
          items={this.props.shop.powerDice}
          columnNames={{
            name: 'Name',
            current: 'Current Max',
            cost: 'Cost to Increase',
            new: 'New Max'
          }}
        />
      </div>
    )
  }
}

export default CharacterSheetShop