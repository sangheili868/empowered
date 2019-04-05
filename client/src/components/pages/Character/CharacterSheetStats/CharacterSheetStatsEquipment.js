import React, { Component } from 'react'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import EmpModal from '../../../EmpModal/EmpModal'
import CharacterSheetList from '../CharacterSheetList/CharacterSheetList'
import { plus } from '../CharacterPage.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import withoutIndex from '../../../../utils/withoutIndex'
import { pick } from 'lodash'

class CharacterSheetStatsEquipment extends Component {

  handleSaveGold = ({gold}) => {
    this.props.updateCharacter('stats.equipment.gold', gold)
  }

  handleEditItem = (columnName, index, values) => {
    this.props.updateCharacter(`stats.equipment.${columnName}.${index}`, {
      ...values,
      quantity: parseInt(values.quantity)
    })
  }

  handleDeleteItem = (columnName, index) => {
    const newEquipment = withoutIndex(this.props.currentEquipment[columnName], index)
    this.props.updateCharacter(`stats.equipment.${columnName}`, newEquipment)
  }

  handleAddItem = (columnName, values) => {
    this.props.updateCharacter(`stats.equipment.${columnName}`, [
      ...this.props.currentEquipment[columnName],
      {
        ...values,
        quantity: parseInt(values.quantity)
      }
    ])
  }

  get subtitles () {
    const currentWeight = this.props.equipment.encumberance.current.toFixed(1)
    const weightLimit = this.props.equipment.encumberance.limit.toFixed(1)
    return [
      <EmpItemEditor
        isInline
        title="Edit Gold"
        fields={{
          gold: {
            value: this.props.equipment.gold,
            validation: 'number'
          }
        }}
        onSave={this.handleSaveGold}
      >
        <div key="gold">Gold: {this.props.equipment.gold}</div>
      </EmpItemEditor>,
      <div key="carryWeight">Capacity: {currentWeight} / {weightLimit}</div>
    ]
  }

  renderEditItem = (columnName, item, index) => {
    const category = { weapon: 'Weapons', armor: 'Armor', shield: 'Shield' }[item.category]
    const label = (item.quantity > 1) ? `${item.name} (${item.quantity})` : item.name
    const { name, quantity, description } = this.props.equipment[columnName][index]
    const fields = {
      name: {
        value: name
      },
      quantity: {
        value: quantity,
        validation: 'number'
      },
      description: {
        value: description,
        validation: 'none',
        isAllowingNewLines: true
      }
    }
    return item.category ? (
      <EmpModal
        key={index}
        title={item.name}
        body={<div>Click on {item.name} in the { category } section to edit this item.</div>}
      >
        {item.name}
      </EmpModal>
    ) : (
      <EmpItemEditor
        key={index}
        isInline
        title={'Edit a ' + columnName + ' Item'}
        fields={fields}
        onSave={this.handleEditItem.bind(this, columnName, index)}
        onDelete={this.handleDeleteItem.bind(this, columnName, index)}
      >
        {label}
      </EmpItemEditor>
    )
  }

  renderAddItem = columnName => {
    return (
      <EmpItemEditor
        title={'Add a ' + columnName + ' Item'}
        fields={{
          name: {
            value: ''
          },
          quantity: {
            value: 1,
            validation: 'number'
          },
          description: {
            value: '',
            validation: 'none',
            isAllowingNewLines: true
          }
        }}
        mode="noStyle"
        onSave={this.handleAddItem.bind(this, columnName)}
      >
        <FontAwesomeIcon className={plus} icon={'plus-square'}/>
      </EmpItemEditor>
    )
  }

  render () {
    return (
      <CharacterSheetList
        title="Gear"
        subtitles={this.subtitles}
        items={pick(this.props.equipment, ['heavy', 'medium', 'light'])}
        editItem={this.renderEditItem}
        addToList={this.renderAddItem}
      />
    )
  }
}

export default CharacterSheetStatsEquipment
