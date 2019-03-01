import React, { Component } from 'react'
import { stats, tableAdd } from './CharacterPage.module.scss'
import CharacterSheetStatsResources from "./CharacterSheetStatsResources"
import CharacterSheetStatsSkills from "./CharacterSheetStatsSkills"
import CharacterSheetStatsList from './CharacterSheetStatsList'
import CharacterSheetStatsTable from './CharacterSheetStatsTable'
import { chain } from 'lodash'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'

class CharacterSheetStats extends Component {
  render () {
    return (
      <div>
        <CharacterSheetStatsResources stats={this.props.stats} onUpdate={this.props.onUpdate}/>
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
          >
            <div className={tableAdd}>
              Add weapon
              <EmpItemEditor
                title="Add a weapon"
                fields={{ name: '', category: '' }}
                onUpdate={values => this.props.onUpdate({
                  stats: {
                    weapons: [
                      ...this.props.stats.weapons,
                      values
                    ]
                  }
                })}
              />
            </div>
          </CharacterSheetStatsTable>
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
            addToList={columnName =>
              <EmpItemEditor
                title={'Add a ' + columnName + ' Item'}
                fields={(columnName === 'light') ? { name: '', quantity: 1 } : { name: '' }}
                onUpdate={(values) =>
                  this.props.onUpdate({ stats: { equipment: { [columnName]: [
                    ...this.props.stats.equipment[columnName],
                    (columnName === 'light') ? values : values.name
                  ]}}})
                }
              />
            }
          />
          <CharacterSheetStatsList
            title="Proficiencies"
            items={{
              languages: this.props.stats.languages,
              items: this.props.stats.proficiencies.map(({ name }) => name)
            }}
            addToList={columnName =>
              <EmpItemEditor
                title={'Add ' + columnName}
                fields={{ name: ''}}
                onUpdate={({ name }) => {
                  const key = (columnName === 'languages') ? 'languages' : 'proficiencies'
                  this.props.onUpdate({
                    stats: {
                      [key]: [
                        ...this.props.stats[key],
                        name
                      ]
                    }
                  })
                }}
              />
            }
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
          >
            <div className={tableAdd}>
              Add Feature
              <EmpItemEditor
                title="Add a feature"
                fields={{ name: '', description: '', type: '' }}
                onUpdate={values => this.props.onUpdate({
                  stats: {
                    features: [
                      ...this.props.stats.features,
                      {
                        ...values,
                        type: values.type.split(' ')
                      }
                    ]
                  }
                })}
              />
            </div>
          </CharacterSheetStatsTable>
        </div>
      </div>
    )
  }
}

export default CharacterSheetStats