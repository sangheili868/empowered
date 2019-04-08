import React, { Component } from 'react'
import withoutIndex from '../../../../utils/withoutIndex'
import CharacterSheetTable from '../../Character/CharacterSheetTable/CharacterSheetTable'
import { control, plus, minus } from '../../Creatures/CreatureSheetStats/CreatureSheetStats.module.scss'
import Creature from '../../../../classes/Creature';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class EncounterList extends Component {

  state = {
    creatureOptions: []
  }

  get combatantFields () {
    return {
      creature: {
        value: '',
        options: this.state.creatureOptions
      },
      customName: {
        value: '',
        validation: 'none'
      }
    }
  }


  handleOpen = async () => {
    await fetch(`/api/creatures/readAllNames`, { method: 'POST' })
      .then(response => {
        if(response.ok === false) {
          throw new Error('Cannot connect to server. Are you sure you are on the correct wifi?')
        } else {
          return response.json()
        }
      })
      .then(async rawCreatures => {
        const creatureOptions = rawCreatures.map(({ _id, name }) => ({ label: name, value: _id }))
        this.setState({ creatureOptions })
      })
  }

  handleAdd = async newCombatant => {
    await fetch(`/api/creatures/read`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: newCombatant.creature })
    })
      .then(response => response.json())
      .then(creatureData => {
        const creature = new Creature(creatureData)
        this.props.updateEncounter('combatants', [
          ...this.props.combatants,
          {
            ...newCombatant,
            hitPoints: creature.stats.maxHitPoints,
            powerPoints: creature.stats.maxPowerPoints
          }
        ])
      })
  }

  handleEdit = (index, combatant) => {
    this.props.updateEncounter(`combatants.${index}`, combatant)
  }

  handleDelete = index => {
    return this.props.updateEncounter('combatants', withoutIndex(
      this.props.combatants,
      index
    ))
  }

  handleIncrement = (index, field, value, event) => {
    event.stopPropagation()
    this.props.updateEncounter(`combatants.${index}.${field}`, value + 1, 1)
  }

  handleDecrement = (index, field, value, event) => {
    event.stopPropagation()
    this.props.updateEncounter(`combatants.${index}.${field}`, value - 1, -1)
  }

  get renderFields () {
    return {
      hitPoints: (combatant, index) => {
        return (
          <div>
            <FontAwesomeIcon
              className={[control, minus].join(' ')}
              onClick={this.handleDecrement.bind(this, index, 'hitPoints', combatant.hitPoints)}
              icon="minus-square"
            />
            {combatant.hitPoints} / {combatant.maxHitPoints}
            <FontAwesomeIcon
              className={[control, plus].join(' ')}
              onClick={this.handleIncrement.bind(this, index, 'hitPoints', combatant.hitPoints)}
              icon="plus-square"
            />
          </div>
        )
      },
      powerPoints: (combatant, index) => {
        return combatant.powerPoints ? (
          <div>
            <FontAwesomeIcon
              className={[control, minus].join(' ')}
              onClick={this.handleDecrement.bind(this, index, 'powerPoints', combatant.powerPoints)}
              icon="minus-square"
            />
            {combatant.powerPoints} / {combatant.maxPowerPoints}
            <FontAwesomeIcon
              className={[control, plus].join(' ')}
              onClick={this.handleIncrement.bind(this, index, 'powerPoints', combatant.powerPoints)}
              icon="plus-square"
            />
          </div>
        ) : ''
      }
    }
  }

  render () {
    return (
      <CharacterSheetTable
        title="Combatants"
        columnNames={{
          name: 'Name',
          hitPoints: 'Hit Points',
          armor: 'Armor',
          evasion: 'Evasion',
          shield: 'Shield',
          speed: 'Speed',
          attack: 'Attack',
          powerPoints: 'Power Points'
        }}
        items={this.props.combatants}
        fields={this.combatantFields}
        renderFields={this.renderFields}
        onAdd={this.handleAdd}
        onOpen={this.handleOpen}
        onEdit={this.handleEdit}
        onDelete={this.handleDelete}
      />
    )
  }
}

export default EncounterList
