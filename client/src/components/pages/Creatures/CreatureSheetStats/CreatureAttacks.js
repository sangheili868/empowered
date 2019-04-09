import React, { Component } from 'react'
import EmpTable from '../../../EmpTable/EmpTable'
import withoutIndex from '../../../../utils/withoutIndex'
import skillData from '../../../../gameData/skills.json'
import { startCase } from 'lodash'

class CreatureAttacks extends Component {

  get skillOptions () {
    return {
      value: '',
      options: skillData.map(({name}) => ({ label: startCase(name), value: name }))
    }
  }

  handleAdd = newAttack => {
    this.props.updateCreature('stats.attacks', [
      ...this.props.attacks,
      newAttack
    ])
  }

  handleEdit = (index, attack) => {
    this.props.updateCreature(`stats.attacks.${index}`, attack)
  }

  handleDelete = index => {
    this.props.updateCreature('stats.attacks', withoutIndex(this.props.attacks, index))
  }

  render () {
    return (
      <EmpTable
        title="Attacks"
        columnNames={{
          name: 'Name',
          hit: 'To Hit',
          damage: 'Damage',
          notes: 'Notes'
        }}
        items={this.props.attacks}
        fields={{
          name: '',
          skill: this.skillOptions,
          damageDice: '',
          notes: {
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

export default CreatureAttacks
