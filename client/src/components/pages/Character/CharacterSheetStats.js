import React, { Component } from 'react'
import { stats } from './CharacterPage.module.scss'
import CharacterSheetStatsResources from "./CharacterSheetStatsResources"
import CharacterSheetStatsSkills from "./CharacterSheetStatsSkills"
import CharacterSheetStatsList from './CharacterSheetStatsList'
import CharacterSheetStatsTable from './CharacterSheetStatsTable'
import { chain } from 'lodash'

class CharacterSheetStats extends Component {
  render () {
    return (
      <div>
        <CharacterSheetStatsResources stats={this.props.stats}/>
        <div className={stats}>
          <CharacterSheetStatsSkills
            abilityScores={this.props.stats.abilityScores}
            skills={this.props.stats.skills}
          />
          <CharacterSheetStatsTable
            title="Weapons"
            items={this.props.stats.weapons}
            columnNames={{
              name: 'Name',
              bonus: 'Hit Bonus',
              damage: 'Damage',
              range: 'Range',
              notes: 'Notes'
            }}
          />
          <CharacterSheetStatsList
            title="Equipment"
            subtitles={[
              <div key="gold">Gold: {this.props.stats.equipment.gold}</div>,
              <div key="carryWeight">
                {
                  "Carried Weight: " +
                  this.props.stats.equipment.encumberance.current.toFixed(2) +
                  " / " + this.props.stats.equipment.encumberance.limit.toFixed(2)
                }
              </div>
            ]}
            items={
              chain(this.props.stats.equipment)
              .pick(['heavy', 'medium', 'light'])
              .mapValues(equipmentList => equipmentList.map(equipment => {
                if (equipment.name && equipment.quantity) {
                  return `${equipment.name} (${equipment.quantity})`
                } else {
                  return equipment
                }
              }))
              .value()
            }
          />
          <CharacterSheetStatsList
            title="Proficiencies"
            items={{
              languages: this.props.stats.languages,
              items: this.props.stats.proficiencies.map(({ name }) => name)
            }}
          />
          <CharacterSheetStatsList
            title="Combat"
            items={{
              Actions: chain(this.props.stats.actions)
                .values()
                .orderBy(['feature', 'cardinal'], ['desc', 'desc'])
                .orderBy('feature', 'desc')
                .map(({ name, cardinal }) => name + (cardinal ? ' (C)' : ''))
                .value(),
              'Wrestling Maneuvers': chain(this.props.stats.maneuvers)
                .values()
                .orderBy('feature', 'desc')
                .map('name')
                .value(),
              Reactions: chain(this.props.stats.reactions)
                .values()
                .orderBy('feature', 'desc')
                .map('name')
                .value()
            }}
          />
          <CharacterSheetStatsTable
            title="Features"
            items={this.props.stats.features}
            columnNames={{
              name: 'Name',
              description: 'Description'
            }}
          />
        </div>
      </div>
    )
  }
}

export default CharacterSheetStats