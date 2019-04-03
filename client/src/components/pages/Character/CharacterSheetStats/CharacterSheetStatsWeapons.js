import React, { Component } from 'react'
import equipmentProficiencyData from '../../../../gameData/equipmentProficiencies.json'
import weaponData from '../../../../gameData/weapons.json'
import CharacterSheetTable from '../CharacterSheetTable/CharacterSheetTable'
import withoutIndex from '../../../../utils/withoutIndex'
import EmpCheckbox from '../../../EmpCheckbox/EmpCheckbox'
import { some } from 'lodash'

class CharacterSheetStatsWeapons extends Component {

  get fields () {
    return {
      name: {
        value: ''
      },
      category: {
        value: '',
        options: this.props.availableWeapons.map(({ displayName, key}) => ({
          label: displayName,
          value: key
        }))
      },
      weight: {
        value: '',
        options: [
          { label: 'Weightless', value: 'none' },
          { label: 'Light', value: 'light' },
          { label: 'Medium', value: 'medium' },
          { label: 'Heavy', value: 'heavy' }
        ]
      }
    }
  }

  renderDescription = ({ category }) => {
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

  handleEquip = (toggledIndex, value) => {
    this.props.updateCharacter(`stats.weapons.${toggledIndex}.isEquipped`, value)
  }

  renderEquip = index => {
    const { isEquipped, hands } = this.props.weapons[index]
    const hasOpenHand = this.props.loadout.hands.length < 2

    const isUnarmedAndFree = hasOpenHand && (hands === 'unarmed')

    const hasOneHanded = this.props.loadout.hands.includes('one') && hands !== 'any'
    const hasLight = this.props.loadout.hands.includes('light') && !(['light', 'any'].includes(hands))
    const hasAny = this.props.loadout.hands.includes('any') && hands === 'two'

    const isChecked = isEquipped || isUnarmedAndFree
    const isDisabled = !isEquipped && some([!hasOpenHand, hasOneHanded, hasLight, hasAny])

    return (
      <EmpCheckbox isChecked={isChecked} isDisabled={isDisabled} onToggle={this.handleEquip.bind(this, index)}/>
    )
  }

  render () {
    return (<>
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
        customFields={[
          {
            title: 'Equip',
            render: this.renderEquip
          }
        ]}
      />
      </>
    )
  }
}

export default CharacterSheetStatsWeapons
