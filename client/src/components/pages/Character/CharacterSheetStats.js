import React, { Component } from 'react'
import { stats } from './CharacterPage.module.scss'
import CharacterSheetStatsResources from "./CharacterSheetStatsResources"
import CharacterSheetStatsSkills from "./CharacterSheetStatsSkills"
import CharacterSheetStatsList from './CharacterSheetStatsList'
import CharacterSheetStatsTable from './CharacterSheetStatsTable'
import { chain, cloneDeep } from 'lodash'
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
            title="weapon"
            items={this.props.stats.weapons}
            isEditable
            columnNames={{
              name: 'Name',
              bonus: 'Hit Bonus',
              damage: 'Damage',
              range: 'Range',
              notes: 'Notes'
            }}
            fields={{ name: '', category: '' }}
            onEdit={(index, values) => {
              let newWeapons = cloneDeep(this.props.stats.weapons)
              newWeapons[index] = values
              this.props.onUpdate({ stats: { weapons: newWeapons } })
            }}
            onAdd={values => this.props.onUpdate({ stats: { weapons: [
                  ...this.props.stats.weapons,
                  values
            ]}})}
          />
          <CharacterSheetStatsList
            title="Equipment"
            subtitles={[
              <EmpItemEditor
                isInline
                title="Edit Gold"
                fields={{gold: this.props.stats.equipment.gold}}
                onUpdate={({gold}) => this.props.onUpdate({ stats: { equipment: { gold }}})}
              >
                <div key="gold">Gold: {this.props.stats.equipment.gold}</div>
              </EmpItemEditor>,
              <div key="carryWeight">
                {
                  "Carried Weight: " +
                  this.props.stats.equipment.encumberance.current.toFixed(2) +
                  " / " + this.props.stats.equipment.encumberance.limit.toFixed(2)
                }
              </div>
            ]}
            isEditable
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
            editItem={(columnName, item, index) => 
              <EmpItemEditor
                key={index}
                isInline
                isEditable
                isDeletable
                title={'Edit a ' + columnName + ' Item'}
                fields={(columnName === 'light') ? (
                  this.props.stats.equipment[columnName][index]
                ) : (
                  { name: item }
                )}
                onUpdate={values => {
                  let newItems = cloneDeep(this.props.stats.equipment[columnName])
                  newItems[index] = (columnName === 'light') ? {
                    name: values.name,
                    quantity: parseInt(values.quantity)
                  } : values.name
                  this.props.onUpdate({ stats: { equipment: { [columnName]: newItems }}})
                }}
                onDelete={() => {
                  let newItems = cloneDeep(this.props.stats.equipment[columnName])
                  // Change heavy and medium items to objects to make this work
                  newItems[index].deleted = true
                  this.props.onUpdate({ stats: { equipment: { [columnName]: newItems }}})
                }}
              >
                {item}
              </EmpItemEditor>
            }
            addToList={columnName =>
              <EmpItemEditor
                title={'Add a ' + columnName + ' Item'}
                fields={(columnName === 'light') ? { name: '', quantity: 1 } : { name: '' }}
                onUpdate={values =>
                  this.props.onUpdate({ stats: { equipment: { [columnName]: [
                    ...this.props.stats.equipment[columnName],
                    (columnName === 'light') ? {
                      name: values.name,
                      quantity: parseInt(values.quantity)
                    } : values.name
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
            title="feature"
            items={this.props.stats.features}
            isEditable
            columnNames={{
              name: 'Name',
              description: 'Description'
            }}
            fields={{ name: '', description: '', type: '' }}
            onEdit={(index, values) => {
              let newFeatures = cloneDeep(this.props.stats.features)
              newFeatures[index] = values
              this.props.onUpdate({ stats: { features: newFeatures } })
            }}
            onAdd={values => this.props.onUpdate({
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
      </div>
    )
  }
}

export default CharacterSheetStats