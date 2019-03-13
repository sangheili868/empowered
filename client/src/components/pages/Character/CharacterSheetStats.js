import React, { Component } from 'react'
import { stats } from './CharacterPage.module.scss'
import CharacterSheetStatsResources from "./CharacterSheetStatsResources"
import CharacterSheetSkills from "./CharacterSheetSkills"
import CharacterSheetStatsList from './CharacterSheetStatsList'
import CharacterSheetTable from './CharacterSheetTable'
import { pick, cloneDeep } from 'lodash'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import weaponData from '../../../gameData/weapons.json'
import equipmentProficiencyData from '../../../gameData/equipmentProficiencies.json'
import pluralize from 'pluralize'
import featureFields from '../../../gameData/featureFields';

class CharacterSheetStats extends Component {
  render () {
    return (
      <div>
        <CharacterSheetStatsResources stats={this.props.stats} onUpdate={this.props.onUpdate}/>
        <div className={stats}>
          <CharacterSheetSkills
            abilityScores={this.props.stats.abilityScores}
            skills={this.props.stats.skills}
          />
          <CharacterSheetTable
            title="Weapons"
            addText="Add a weapon"
            items={this.props.stats.weapons}
            columnNames={{
              name: 'Name',
              bonus: 'Hit Bonus',
              damage: 'Damage',
              notes: 'Notes'
            }}
            fields={{name: '', category: this.props.stats.availableWeapons.map(({ displayName, key}) => ({
              text: displayName,
              value: key
            })) }}
            description={({category}) => {
              if (category && category.value && !Array.isArray(category.value)) {
                return equipmentProficiencyData[weaponData[category.value].proficiency].description
              }
            }}
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
                  "Capacity: " +
                  this.props.stats.equipment.encumberance.current.toFixed(2) +
                  " / " + this.props.stats.equipment.encumberance.limit.toFixed(2)
                }
              </div>
            ]}
            items={pick(this.props.stats.equipment, ['heavy', 'medium', 'light'])}
            editItem={(columnName, item, index) =>
              <EmpItemEditor
                key={index}
                isInline
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
                title={item.name}
                description={columnName === 'languages' ? '' : (
                  <>
                    <p>{item.description}</p>
                    <p>
                      If you delete your {
                        this.props.stats.proficiencies[columnName][index].name
                      } proficiency, you will regain 1 advancement.
                    </p>
                  </>
                )}
                fields={columnName === 'languages' ? ({
                  name: this.props.stats.proficiencies[columnName][index].name
                }) : {}}
                onUpdate={values => {
                  let newItems = cloneDeep(this.props.stats.proficiencies[columnName])
                  newItems[index] = values
                  this.props.onUpdate({ stats: { proficiencies: { [columnName]: newItems }}})
                }}
                onDelete={() => {
                  let newItems = cloneDeep(this.props.stats.proficiencies[columnName])
                  newItems[index].deleted = true
                  this.props.onUpdate({ stats: { proficiencies: { [columnName]: newItems }}})
                  if (columnName !== 'languages') {
                    this.props.onUpdate({ shop: { advancements: parseInt(this.props.shop.advancements) + 1 } })
                  }
                }}
              >
                {item.name}
              </EmpItemEditor>
            }
          />
          <CharacterSheetStatsList
            title="Combat"
            items={this.props.stats.actions}
            tooltips={{
              title: 'name',
              body: 'description'
            }}
          />
          <CharacterSheetTable
            title="Features"
            items={this.props.stats.features}
            columnNames={{
              name: 'Name',
              description: 'Description'
            }}
            fields={featureFields}
            deleteText={index => `
              If you delete this feature, you will regain ${
                this.props.stats.features[index].cost
              } ${
                pluralize('advancement', this.props.stats.features[index].cost)
              }.
            `}
            onEdit={(index, values) => {
              let newFeatures = cloneDeep(this.props.stats.features)
              newFeatures[index] = {
                ...values,
                // type: values.type.split(',')
              }
              this.props.onUpdate({ stats: { features: newFeatures } })
            }}
            onDelete={index => {
              let newFeatures = cloneDeep(this.props.stats.features)
              const newShopFeature = cloneDeep(this.props.stats.features[index])
              newFeatures[index] = { deleted: true }
              this.props.onUpdate({ stats: { features: newFeatures } })
              this.props.onUpdate({ shop: {
                advancements: parseInt(this.props.shop.advancements) + (newShopFeature.cost || 0),
                features: [
                  ...this.props.shop.features,
                  newShopFeature
                ]
              }})
            }}
          />
        </div>
      </div>
    )
  }
}

export default CharacterSheetStats
