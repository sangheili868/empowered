import React, { Component } from 'react'
import equipmentProficiencyData from '../../../../gameData/equipmentProficiencies.json'
import weaponData from '../../../../gameData/weapons.json'
import CharacterSheetTable from '../CharacterSheetTable/CharacterSheetTable'
import withoutIndex from '../../../../utils/withoutIndex'

class CharacterSheetStatsWeapons extends Component {

  get fields () {
    return {
      name: '',
      category: {
        default: '',
        options: this.props.availableWeapons.map(({ displayName, key}) => ({
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
    }
  }

  renderDescription = ({category}) => {
    if (category && category.value && !Array.isArray(category.value)) {
      return equipmentProficiencyData[weaponData[category.value].proficiency].description
    }
  }

  handleEdit = (index, values) => {
    this.props.updateCharacter(`stats.weapons.${index}`, values)
  }

  handleDelete = index => {
    this.props.updateCharacter('stats.weapons', withoutIndex(
      this.props.currentWeapons,
      index
    ))
  }

  handleAdd = values => {
    this.props.updateCharacter('stats.weapons', [ ...this.props.currentWeapons, values ])
  }

  render () {
    return (
      <CharacterSheetTable
        title="Weapons"
        addText="Add a weapon"
        items={this.props.weapons}
        columnNames={{ name: 'Name', bonus: 'Hit Bonus', damage: 'Damage', notes: 'Notes' }}
        fields={this.fields}
        description={this.renderDescription}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
        onAdd={this.handleAdd}
      />
    )
  }
}

export default CharacterSheetStatsWeapons
