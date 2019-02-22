import React, { Component } from 'react'
import CharacterSheetStatsResources from "./CharacterSheetStatsResources"
import CharacterSheetStatsWeapons from "./CharacterSheetStatsWeapons"
import CharacterSheetStatsSkills from "./CharacterSheetStatsSkills"
import CharacterSheetStatsEquipment from "./CharacterSheetStatsEquipment"
import CharacterSheetStatsList from './CharacterSheetStatsList'
import { chain } from 'lodash'

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
        <CharacterSheetStatsList title="Languages" items={this.props.stats.languages}/>
        <CharacterSheetStatsList
          title="Proficiencies"
          items={this.props.stats.proficiencies.map(({ name }) => name)}
        />
        <CharacterSheetStatsList
          title="Actions"
          items={
            chain(this.props.stats.actions)
              .values()
              .orderBy(['feature', 'cardinal'], ['desc', 'desc'])
              .orderBy('feature', 'desc')
              .map(({ name, cardinal }) => name + (cardinal ? ' (C)' : ''))
              .value()
          }
        />
        <CharacterSheetStatsList
          title="Wrestling Maneuvers"
          items={
            chain(this.props.stats.maneuvers)
              .values()
              .orderBy('feature', 'desc')
              .map('name')
              .value()
          }
        />
        <CharacterSheetStatsList
          title="Reactions"
          items={
            chain(this.props.stats.reactions)
              .values()
              .orderBy('feature', 'desc')
              .map('name')
              .value()
          }
        />
      </div>
    )
  }
}

export default CharacterSheetStats