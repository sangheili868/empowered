import skillData from '../gameData/skills.json'
import { chain, mapValues } from 'lodash'
import addPlus from '../utils/addPlus'

class Creature {

  constructor(basedCreatureData) {
    this.name = basedCreatureData.name
    this.bio = basedCreatureData.bio
    this.baseStats = basedCreatureData.stats
  }

  get skills () {
    return chain(skillData).keyBy('name').mapValues(skill => {
      const value = skill.abilityScores.reduce((acc, ability) => acc + this.baseStats.abilityScores[ability], 0)
      return {
        ...skill,
        value,
        passive: value + 10,
        displayValue: addPlus(value)
      }
    }).value()
  }

  get attacks () {
    return this.baseStats.attacks.map(attack => {
      const skillMod = this.skills[attack.skill].value
      return {
        ...attack,
        hit: addPlus(skillMod),
        damage: attack.damageDice + ' ' + addPlus(skillMod, true)
      }
    })
  }

  get stats () {
    return {
      ...this.baseStats,
      maxHitPoints: this.skills.fortitude.passive * this.baseStats.woundLimit,
      abilityScores: mapValues(this.baseStats.abilityScores, value => ({ value, displayValue: addPlus(value)})),
      skills: this.skills,
      attacks: this.attacks
    }
  }
}

export default Creature
