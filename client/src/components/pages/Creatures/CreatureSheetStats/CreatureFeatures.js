import React, { Component } from 'react'
import CharacterSheetTable from '../../Character/CharacterSheetTable/CharacterSheetTable'
import withoutIndex from '../../../../utils/withoutIndex'

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
      powerPoints: { value: 1, validation: 'number' },

    }
  }

  render () {
    return (
      <CharacterSheetTable
        title="Features"
        columnNames={{ name: 'Name', description: 'Description', powerPoints: 'Power Points' }}
        items={this.props.features}
        renderFields={{ description: this.renderFeatureDescription }}
        fields={this.fields}
        onAdd={this.handleAdd}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
      />
    )
  }
}

export default CreatureFeatures
