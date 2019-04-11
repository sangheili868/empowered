import React, { Component } from 'react'
import { header, nameAndBio, name, combatants } from './EncountersPage.module.scss'
import EmpTableStrings from '../../EmpTable/EmpTableStrings'
import { chain } from 'lodash'
import Creature from '../../../classes/Creature'
import EncounterCombatant from './EncounterCombatant/EncounterCombatant'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import EmpIconButton from '../../EmpIconButton/EmpIconButton'
import withoutIndex from '../../../utils/withoutIndex'

class EncounterDetails extends Component {

  state = {
    creatureOptions: []
  }

  handleUpdateBio = (index, { content }) => {
    return this.props.updateEncounter(this.bioItems[index].title, content)
  }

  get bioItems () {
    return chain(this.props.encounter).pick(['name', 'description', 'loot']).map((content, title) => ({
      title,
      content,
      isAllowingNewLines: title !== 'name',
      ...((title !== 'name') && { validation: 'none' }),
      isTruncating: title === 'portrait'
    })).value()
  }

  handleOpenAddDialog = async () => {
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
          ...this.props.encounter.combatants,
          {
            ...newCombatant,
            hitPoints: creature.stats.maxHitPoints,
            powerPoints: creature.stats.maxPowerPoints,
            attack: 0,
            notes: ''
          }
        ],
        creature)
        this.props.onAddCreature(creatureData)
      })
  }

  handleUpdateCombatant = (index, field, newValue) => {
    this.props.updateEncounter(`combatants.${index}.${field}`, newValue)
  }

  handleDeleteCombatant = index => {
    return this.props.updateEncounter('combatants', withoutIndex(
      this.props.encounter.combatants,
      index
    ))
  }

  render () {
    return (
      <>
        <div className={header}>
          <div className={nameAndBio}>
            <div className={name}>{this.props.encounter.name || 'Unnamed Encounter'}</div>
            <EmpTableStrings items={this.bioItems} onSave={this.handleUpdateBio}/>
          </div>
        </div>
        <div className={combatants}>
          {this.props.combatants.map((combatant, index) =>
            <EncounterCombatant
              key={index}
              combatant={combatant}
              onUpdate={this.handleUpdateCombatant.bind(this, index)}
              onDelete={this.handleDeleteCombatant.bind(this, index)}
            />
          )}
        </div>
        <EmpItemEditor
          title="Add a Combatant"
          fields={{
            creature: {
              value: '',
              options: this.state.creatureOptions
            },
            customName: {
              value: '',
              validation: 'none'
            }
          }}
          mode="noStyle"
          onOpen={this.handleOpenAddDialog}
          onSave={this.handleAdd}
        >
          <EmpIconButton color="success" icon="plus"/>
        </EmpItemEditor>
      </>
    )
  }
}

export default EncounterDetails
