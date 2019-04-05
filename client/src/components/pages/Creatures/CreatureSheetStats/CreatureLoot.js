import React, { Component } from 'react'
import CharacterSheetTable from '../../Character/CharacterSheetTable/CharacterSheetTable'
import withoutIndex from '../../../../utils/withoutIndex'

class CreatureLoot extends Component {

  handleAdd = newLoot => {
    this.props.updateCreature('stats.loot', [
      ...this.props.loot,
      newLoot
    ])
  }

  handleEdit = (index, attack) => {
    this.props.updateCreature(`stats.loot.${index}`, attack)
  }

  handleDelete = index => {
    this.props.updateCreature('stats.loot', withoutIndex(this.props.loot, index))
  }

  render () {
    return (
      <CharacterSheetTable
        title="Loot"
        columnNames={{
          name: 'Name',
          quantity: 'Quantity',
          description: 'Description'
        }}
        items={this.props.loot}
        fields={{
          name: '',
          quantity: {
            value: this.skillOptions,
            validation: 'number'
          },
          description: {
            value: '',
            validation: 'none'
          }
        }}
        onAdd={this.handleAdd}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
      />

    )
  }
}

export default CreatureLoot
