import React, { Component } from 'react'
import { stats } from './CharacterPage.module.scss'
import CharacterSheetStatsResources from "./CharacterSheetStatsResources"
import CharacterSheetStatsSkills from "./CharacterSheetStatsSkills"
import CharacterSheetStatsList from './CharacterSheetStatsList'
import CharacterSheetTable from './CharacterSheetTable'
import { chain, pick, cloneDeep } from 'lodash'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import weaponData from '../../../gameData/weapons.json'
import equipmentProficiencyData from '../../../gameData/equipmentProficiencies.json'
import { startCase } from 'lodash'

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
          <CharacterSheetTable
            title="Weapons"
            addText="Add a weapon"
            items={this.props.stats.weapons}
            isEditable
            columnNames={{
              name: 'Name',
              bonus: 'Hit Bonus',
              damage: 'Damage',
              range: 'Range',
              notes: 'Notes'
            }}
            fields={{name: '', category: Object.keys(weaponData).map(weapon => ({
              text: startCase(weapon),
              value: weapon
            })) }}
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
            items={pick(this.props.stats.equipment, ['heavy', 'medium', 'light'])}
            editItem={(columnName, item, index) => 
              <EmpItemEditor
                key={index}
                isInline
                isEditable
                isDeletable
                title={'Edit a ' + columnName + ' Item'}
                fields={this.props.stats.equipment[columnName][index]}
                onUpdate={values => {
                  let newItems = cloneDeep(this.props.stats.equipment[columnName])
                  newItems[index] = {
                    name: values.name,
                    quantity: parseInt(values.quantity)
                  }
                  this.props.onUpdate({ stats: { equipment: { [columnName]: newItems }}})
                }}
                onDelete={() => {
                  let newItems = cloneDeep(this.props.stats.equipment[columnName])
                  newItems[index].deleted = true
                  this.props.onUpdate({ stats: { equipment: { [columnName]: newItems }}})
                }}
              >
                {item.quantity > 1 ? `${item.name} (${item.quantity})` : item.name}
              </EmpItemEditor>
            }
            addToList={columnName =>
              <EmpItemEditor
                title={'Add a ' + columnName + ' Item'}
                fields={{ name: '', quantity: 1 }}
                onUpdate={values =>
                  this.props.onUpdate({ stats: { equipment: { [columnName]: [
                    ...this.props.stats.equipment[columnName],
                    {
                      name: values.name,
                      quantity: parseInt(values.quantity)
                    }
                  ]}}})
                }
              />
            }
          />
          <CharacterSheetStatsList
            title="Proficiencies"
            items={this.props.stats.proficiencies}
            editItem={(columnName, item, index) => 
              <EmpItemEditor
                key={index}
                isInline
                isEditable
                isDeletable
                title={'Edit a ' + columnName + ' Proficiency'}
                fields={columnName === 'languages' ? ({
                  name: this.props.stats.proficiencies[columnName][index].name
                }) : ({
                  category: {
                    value: this.props.stats.proficiencies[columnName][index].category,
                    default: Object.keys(equipmentProficiencyData).map(equipment => ({
                      text: startCase(equipment),
                      value: equipment
                    }))
                  }
                })}
                onUpdate={values => {
                  let newItems = cloneDeep(this.props.stats.proficiencies[columnName])
                  newItems[index] = values
                  this.props.onUpdate({ stats: { proficiencies: { [columnName]: newItems }}})
                }}
                onDelete={() => {
                  let newItems = cloneDeep(this.props.stats.proficiencies[columnName])
                  newItems[index].deleted = true
                  this.props.onUpdate({ stats: { proficiencies: { [columnName]: newItems }}})
                }}
              >
                {item.name}
              </EmpItemEditor>
            }
            addToList={columnName =>
              <EmpItemEditor
                title={'Add a ' + columnName}
                fields={columnName === 'languages' ? ({  name: '' }) : ({
                  category: {
                    value: '',
                    default: Object.keys(equipmentProficiencyData).map(equipment => ({
                      text: startCase(equipment),
                      value: equipment
                    }))
                  }
                })}
                onUpdate={values => {
                  this.props.onUpdate({ stats: { proficiencies: { [columnName]: [
                    ...this.props.stats.proficiencies[columnName],
                    values
                  ]}}})
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
                .map(({ name, cardinal }) => ({name: name + (cardinal ? ' (C)' : '')}))
                .value(),
              'Wrestling Maneuvers': chain(this.props.stats.maneuvers)
                .values()
                .orderBy('feature', 'desc')
                .value(),
              Reactions: chain(this.props.stats.reactions)
                .values()
                .orderBy('feature', 'desc')
                .value()
            }}
          />
          <CharacterSheetTable
            title="Features"
            addText="Add a feature"
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