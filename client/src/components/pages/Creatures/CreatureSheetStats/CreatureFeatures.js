import React, { Component } from 'react'
import EmpTable from '../../../EmpTable/EmpTable'
import withoutIndex from '../../../../utils/withoutIndex'
import { startCase } from 'lodash'

class CreatureFeatures extends Component {

  handleAdd = newFeature => {
    this.props.updateCreature('stats.features', [
      ...this.props.features,
      newFeature
    ])
  }

  handleEdit = (index, feature) => {
    this.props.updateCreature(`stats.features.${index}`, feature)
  }

  handleDelete = index => {
    this.props.updateCreature('stats.features', withoutIndex(this.props.features, index))
  }

  get fields () {
    return {
      name: { value: '' },
      description: { value: '' },
      powerPoints: { value: 0, validation: 'number' },
      actionType: {
        value: '',
        validation: 'none',
        options: [
          { label: 'Cardinal Action', value: 'cardinalAction' },
          { label: 'Skill Action', value: 'skillAction' },
          { label: 'Basic Action', value: 'basicAction' },
          { label: 'Maneuver', value: 'maneuver' },
          { label: 'Reaction', value: 'reaction'}
        ]
      }
    }
  }

  get renderFields () {
    return {
      actionType: ({ actionType }) => startCase(actionType)
    }
  }

  render () {
    return (
      <EmpTable
        title="Features"
        addText="Add a Feature"
        columnNames={{ name: 'Name', description: 'Description', actionType: 'Action', powerPoints: 'Power Points' }}
        items={this.props.features}
        renderFields={this.renderFields}
        fields={this.fields}
        onAdd={this.handleAdd}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
      />
    )
  }
}

export default CreatureFeatures
