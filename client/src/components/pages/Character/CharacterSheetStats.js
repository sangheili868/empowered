import React, { Component } from 'react'
import CharacterSheetStatsResources from "./CharacterSheetStatsResources"
import CharacterSheetStatsSkills from "./CharacterSheetStatsSkills"
import CharacterSheetStatsList from './CharacterSheetStatsList'
import { chain, upperFirst } from 'lodash'

class CharacterSheetStats extends Component {
  render () {
    return (
      <div>
        <CharacterSheetStatsResources stats={this.props.stats}/>
        <CharacterSheetStatsSkills
          abilityScores={this.props.stats.abilityScores}
          skills={this.props.stats.skills}
        />
        <CharacterSheetStatsList
          title="Weapons"
          items={
            chain(this.props.stats.weapons)
            .reduce(
              (result, weapon) => {
                result.name.push(weapon.name)
                result['Hit Bonus'].push(weapon.bonus)
                result.damage.push(weapon.damage)
                result.range.push(weapon.range + 'ft')
                result.notes.push(weapon.tags && weapon.tags.map(upperFirst).join(', '))
                return result
              },
              { name: [], 'Hit Bonus': [], damage: [], range: [], notes: [] }
            )
            .value()
          }
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