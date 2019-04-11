import React, { Component } from 'react'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import EmpIconButton from '../../../EmpIconButton/EmpIconButton'
import { chain, startCase } from 'lodash'
import EmpTable from '../../../EmpTable/EmpTable'

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
        value: this.props.stats.evasion
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
    else if (field) return (
      <EmpIconButton color="success" icon="plus" onClick={this.handleIncrement.bind(this, field, value)}/>
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
        <EmpIconButton color="edit" icon="pen"/>
      </EmpItemEditor>
    )
    else if (field) return (
      <EmpIconButton color="warning" icon="minus" onClick={this.handleDecrement.bind(this, field, value)}/>
    )
  }

  render () {
    return (
      <EmpTable
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
