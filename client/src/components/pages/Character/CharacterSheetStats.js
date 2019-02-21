import React, { Component } from 'react'
import CharacterSheetStatsResources from "./CharacterSheetStatsResources"
import CharacterSheetStatsWeapons from "./CharacterSheetStatsWeapons"
import CharacterSheetStatsSkills from "./CharacterSheetStatsSkills"
import CharacterSheetStatsEquipment from "./CharacterSheetStatsEquipment"

class CharacterSheetStats extends Component {
  render () {
    return (
      <div>
        <CharacterSheetStatsResources stats={this.props.stats}/>
        <CharacterSheetStatsSkills
          abilityScores={this.props.stats.abilityScores}
          skills={this.props.stats.skills}
        />
        <CharacterSheetStatsWeapons weapons={this.props.stats.weapons}/>
        <CharacterSheetStatsEquipment equipment={this.props.stats.equipment}/>
      </div>
    )
  }
}

export default CharacterSheetStats