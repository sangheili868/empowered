import { keyBy, pick } from 'lodash'
import Creature from './Creature'

class Encounter {

  constructor(baseEncounterData) {
    this.name = baseEncounterData.name
    this.description = baseEncounterData.description
    this.baseCombatants = baseEncounterData.combatants
    this.creatureData = {}
  }

   async fetchCreatures () {
    const _ids = this.baseCombatants.map(({ creature }) => creature)
    await fetch(`/api/creatures/readMany`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _ids })
    })
      .then(response => response.json())
      .then(creatures => {
        this.creatureData = creatures
      })
  }

  get combatants () {
    return this.baseCombatants.map(combatant => {
      const combatantData = new Creature(keyBy(this.creatureData, '_id')[combatant.creature])
      const attack = combatantData.attacks[combatant.attack]
      const attackOptions = combatantData.attacks.map(({ name }, index) => ({ label: name, value: index }))
      const displayName = combatant.customName ? `${combatant.customName} (${combatantData.name})` : combatantData.name
      const speed = `${combatantData.stats.speed.rating}ft. ${combatantData.stats.speed.type}`

      return {
        ...combatantData,
        ...combatant,
        displayName,
        ...pick(combatantData.stats, ['maxHitPoints', 'armor', 'shield', 'maxPowerPoints', 'attacks']),
        evasion: combatantData.stats.skills.agility.value,
        speed,
        attackOptions,
        toHit: attack && attack.hit,
        damage: attack && attack.damage
      }
    })
  }
}

export default Encounter
