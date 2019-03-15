import React, { Component } from 'react'
import { stats, detailTitle, editButton, inlineHover } from './CharacterPage.module.scss'
import CharacterSheetStatsResources from "./CharacterSheetStatsResources"
import CharacterSheetSkills from "./CharacterSheetSkills"
import CharacterSheetStatsList from './CharacterSheetStatsList'
import CharacterSheetTable from './CharacterSheetTable'
import { pick } from 'lodash'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import weaponData from '../../../gameData/weapons.json'
import equipmentProficiencyData from '../../../gameData/equipmentProficiencies.json'
import featureFields from '../../../gameData/featureFields'
import EmpModal from '../../EmpModal/EmpModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import withoutIndex from '../../../utils/withoutIndex'

class CharacterSheetStats extends Component {
  render () {
    return (
      <div>
        <CharacterSheetStatsResources stats={this.props.stats} updateCharacter={this.props.updateCharacter}/>
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
            fields={{
              name: '',
              category: {
                default: '',
                options: this.props.stats.availableWeapons.map(({ displayName, key}) => ({
                  label: displayName,
                  value: key
                }))
              },
              weight: {
                default: 'medium',
                options: [
                  { label: 'None', value: 'none' },
                  { label: 'Light', value: 'light' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'Heavy', value: 'heavy' }
                ]
              }
            }}
            description={({category}) => {
              if (category && category.value && !Array.isArray(category.value)) {
                return equipmentProficiencyData[weaponData[category.value].proficiency].description
              }
            }}
            onEdit={(index, values) => this.props.updateCharacter(['stats', 'weapons', index], values)}
            onDelete={index => this.props.updateCharacter(['stats', 'weapons'], withoutIndex(
              this.props.stats.base.weapons,
              index
            ))}
            onAdd={values => this.props.updateCharacter('stats.weapons', [ ...this.props.stats.base.weapons, values ])}
          />
          <CharacterSheetStatsList
            title="Equipment"
            subtitles={[
              <EmpItemEditor
                isInline
                title="Edit Gold"
                fields={{gold: this.props.stats.equipment.gold}}
                onSave={({gold}) => this.props.updateCharacter('stats.equipment.gold', gold)}
              >
                <div key="gold">Gold: {this.props.stats.equipment.gold}</div>
              </EmpItemEditor>,
              <div key="carryWeight">
                {
                  "Capacity: " +
                  this.props.stats.equipment.encumberance.current.toFixed(1) +
                  " / " + this.props.stats.equipment.encumberance.limit.toFixed(1)
                }
              </div>
            ]}
            items={pick(this.props.stats.equipment, ['heavy', 'medium', 'light'])}
            editItem={(columnName, item, index) => item.category ? (
              <EmpModal
                key={index}
                title={item.name}
                className={inlineHover}
                body={
                  <div>
                    Click on the
                    <FontAwesomeIcon className={editButton} icon="pen-square"/>
                    icon next to {item.name} in the {
                      { weapon: 'Weapons', armor: 'Armor', shield: 'Shield' }[item.category]
                    } section to edit this item.
                  </div>
                }
              >
                {item.name}
              </EmpModal>
            ) : (
              <EmpItemEditor
                key={index}
                isInline
                title={'Edit a ' + columnName + ' Item'}
                fields={this.props.stats.equipment[columnName][index]}
                onSave={values => {
                  this.props.updateCharacter(['stats', 'equipment', columnName, index], {
                    name: values.name,
                    quantity: parseInt(values.quantity)
                  })
                }}
                onDelete={this.props.updateCharacter.bind(this,
                  ['stats', 'equipment', columnName],
                  withoutIndex(this.props.stats.base.equipment[columnName], index)
                )}
              >
                {item.quantity > 1 ? `${item.name} (${item.quantity})` : item.name}
              </EmpItemEditor>
            )}
            addToList={columnName =>
              <EmpItemEditor
                title={'Add a ' + columnName + ' Item'}
                fields={{ name: '', quantity: 1 }}
                onSave={values => this.props.updateCharacter(['stats', 'equipment', columnName], [
                  ...this.props.stats.base.equipment[columnName],
                  {
                    name: values.name,
                    quantity: parseInt(values.quantity)
                  }
                ])}
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
                description={item.description}
                fields={columnName === 'languages' ? ({
                  name: this.props.stats.proficiencies[columnName][index].name
                }) : {}}
                onSave={values => this.props.updateCharacter(['stats', 'proficiencies', columnName, index], values)}
              >
                {item.name}
              </EmpItemEditor>
            }
          />
          <CharacterSheetStatsList
            title="Combat"
            items={this.props.stats.actions}
            tooltips={{
              title: item => item.rootName ? item.rootName : item.name,
              body: item =>
                <>
                  <div>{item.description}</div>
                  {item.features && item.features.length > 0 &&
                    <>
                      <div className={detailTitle}>Features Related to {item.rootName}</div>
                      <div>{item.features.map(({ name }) => name).join(', ')}</div>
                    </>
                  }
                </>
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
            onEdit={(index, values) => this.props.updateCharacter(['stats', 'features', index], values)}
          />
        </div>
      </div>
    )
  }
}

export default CharacterSheetStats
