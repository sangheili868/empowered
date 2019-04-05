import React, { Component } from 'react'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import { chain, startCase } from 'lodash'
import { control, plus, minus, edit } from './CreatureSheetStats.module.scss'
import CharacterSheetTable from '../../Character/CharacterSheetTable/CharacterSheetTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CreatureTraits extends Component {

  handleUpdate = (path, newValue) => {
    this.props.updateCreature(`stats.${path}`, newValue)
  }

  get traits () {
    return [
      {
        displayName: 'Hit Points',
        value: this.props.stats.maxHitPoints
      },
      {
        displayName: 'Evasion',
        value: this.props.stats.skills.agility.value
      },
      ...chain(this.props.stats)
        .pick([
          'woundLimit',
          'powerPoints',
          'armor',
          'shield'
        ])
        .map((value, field) => ({
          displayName: startCase(field),
          field,
          value
        }))
        .value(),
      {
        displayName: 'Speed',
        value: this.props.stats.speed.rating + 'ft.',
        type: this.props.stats.speed.type
      }
    ]
  }

  handleIncrement = (field, value) => {
    this.props.updateCreature(`stats.${field}`, value + 1, 1)
  }

  handleDecrement = (field, value) => {
    this.props.updateCreature(`stats.${field}`, value - 1, -1)
  }

  renderIncrease = index => {
    const { field, value, type } = this.traits[index]
    if (type) return type
    else if (field) return type || (
      <FontAwesomeIcon
        className={[control, plus].join(' ')}
        onClick={this.handleIncrement.bind(this, field, value)}
        icon="plus-square"
      />
    )
  }

  renderDecrease = index => {
    const { field, value, type } = this.traits[index]
    if (type) return (
      <EmpItemEditor
        title="Edit Speed"
        fields={{
          rating: {
            value: this.props.stats.speed.rating
          },
          type: {
            value: this.props.stats.speed.type
          }
        }}
        mode="noStyle"
        onSave={this.props.updateCreature.bind(this, 'stats.speed')}
      >
        <FontAwesomeIcon
          className={[control, edit].join(' ')}
          icon="pen-square"
        />
      </EmpItemEditor>
    )
    if (field) return (
      <FontAwesomeIcon
        className={[control, minus].join(' ')}
        onClick={this.handleDecrement.bind(this, field, value)}
        icon="minus-square"
      />
    )
  }

  render () {
    return (
      <CharacterSheetTable
        title="Traits"
        items={this.traits}
        isHidingColumnNames
        columnNames={{ displayName: 'Trait', value: 'Value' }}
        customFields={[
          {
            title: 'Increase',
            render: this.renderIncrease
          },
          {
            title: 'Decrease',
            render: this.renderDecrease
          }
        ]}
      />
    )
  }
}

export default CreatureTraits
