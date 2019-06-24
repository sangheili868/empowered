import React, { Component } from 'react'
import EncounterDetails from './EncounterDetails'
import newEncounter from '../../../gameData/newEncounter'
import EmpDocManager from '../../EmpDocManager/EmpDocManager'
import EmpLoadingDots from '../../EmpLoadingDots/EmpLoadingDots'
import updateDocument from '../../../utils/updateDocument'
import { keyBy, pick } from 'lodash'
import Creature from '../../../classes/Creature'

class EncountersPage extends Component {

  state = {
    _id: '',
    encounter: null,
    creatureData: {}
  }

  async fetchCreatures (_ids) {
   await fetch(`/api/creatures/readMany`, {
     method: 'POST',
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ _ids })
   })
     .then(response => response.json())
     .then(creatures => {
       this.setState({ creatureData: keyBy(creatures, '_id') })
     })
 }

  handleNewEncounter = async (encounter) => {
    encounter.combatants && await this.fetchCreatures(encounter.combatants.map(({ creature }) => creature))
    this.setState({ encounter })
  }

  handleUpdateId = _id => {
    this.setState({ _id })
  }

  handleUpdateEncounter = async (paths, newValue, newCreature) => {
    const { baseDocument, _id } = await updateDocument('encounters', this.state.encounter, paths, newValue)
    this.setState({ encounter: { ...baseDocument, _id } })
    this.handleUpdateId(_id)
  }

  handleAddCreature = creature => {
    this.setState(prevState => ({
      ...prevState,
      creatureData: {
        ...prevState.creatureData,
        [creature._id]: creature
      }
    }))
  }

  handleDelete = () => {
    this.setState({
      _id: '',
      encounter: null
    })
  }

  get combatants () {
    return this.state.encounter.combatants.map(combatant => {
      const creature = this.state.creatureData[combatant.creature]
      if (!creature) return { ...combatant, isNotLoaded: true }

      const combatantData = new Creature(creature)
      const attack = combatantData.attacks[combatant.attack]
      const attackOptions = combatantData.attacks.map(({ name }, index) => ({ label: name, value: index }))
      const displayName = combatant.customName ? `${combatant.customName} (${combatantData.name})` : combatantData.name
      const speed = `${combatantData.stats.speed.rating}ft. ${combatantData.stats.speed.type}`

      return {
        isNotLoaded: false,
        ...combatantData,
        ...combatant,
        displayName,
        ...pick(combatantData.stats, ['maxHitPoints', 'armor', 'shield', 'maxPowerPoints', 'attacks']),
        evasion: combatantData.stats.evasion,
        speed,
        attackOptions,
        toHit: attack && attack.hit,
        damage: attack && attack.damage,
        isDead: combatant.hitPoints <= 0
      }
    })
  }

  render() {
    return (
      <div>
        <EmpDocManager
          collection="encounter"
          _id={this.state._id}
          document={this.state.encounter}
          newDocument={newEncounter}
          onUpdateDocument={this.handleNewEncounter}
          onUpdateId={this.handleUpdateId}
        />
        {this.state.encounter ? (
          <EncounterDetails
            _id={this.state._id}
            encounter={this.state.encounter}
            combatants={this.combatants}
            updateEncounter={this.handleUpdateEncounter}
            onAddCreature={this.handleAddCreature}
            onDelete={this.handleDelete}
          />
        ) : this.state._id && (
          <EmpLoadingDots/>
        )}
      </div>
    )
  }
}

export default EncountersPage
