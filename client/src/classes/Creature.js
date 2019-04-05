import skillData from '../gameData/skills.json'
import { chain } from 'lodash'
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
        value,
        passive: value + 10,
        displayValue: addPlus(value)
      }
    }).value()
  }

  get stats () {
    return {
      ...this.baseStats,
      maxHitPoints: this.skills.fortitude.passive * this.baseStats.woundLimit,
      skills: this.skills
    }
  }
}

export default Creature
