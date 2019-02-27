import { mapValues } from 'lodash'
import weaponData from '../gameData/weapons.json'
import skillData from '../gameData/skills.json'
import proficiencyData from '../gameData/proficiencies.json'
import actions from '../gameData/actions.json'
import { pick, filter, upperFirst } from 'lodash'

class Character {
  constructor(baseCharacterData) {
    this.name = baseCharacterData.name
    this.portrait = baseCharacterData.portrait
    this.bio = baseCharacterData.bio
    this.baseStats = baseCharacterData.stats
    this.baseShop = baseCharacterData.shop
  }

  get stats () {
   if (this.baseStats) {
    const skills = mapValues(skillData, skill => 
      skill.reduce((acc, ability) =>  acc + this.baseStats.abilityScores[ability], 0)
    )
    const equipment = this.baseStats.equipment
    return {
      ...this.baseStats,
      maxHP: skills.fortitude + 10,
      maxTempHP: skills.fortitude + 10,
      maxWounds: 5, 
      skills,
      equipment: {
        ...this.baseStats.equipment,
        encumberance: {
          current: (equipment.heavy.length +
            (equipment.medium.length / 2) +
            (equipment.light.reduce((acc, { quantity }) => quantity + acc, 0) / 20) +
            (equipment.gold / 2000)
          ),
          limit: skills.brawn + 10
        }
      },
      weapons: this.baseStats.weapons.map(weapon => {
        const weaponStats = weaponData[weapon.category]
        if (!weaponStats) {
          console.error("Weapon Type not found", weapon)
          return weapon
        } else {
          const bonus = skills[weaponStats.skill]
          return {
            range: 5,
            ...weapon,
            ...weaponStats,
            notes: weaponStats.tags && weaponStats.tags.map(upperFirst).join(', '),
            bonus,
            damage: weaponStats.damageDie + (bonus > 0 ? " + " : " - ") + Math.abs(bonus)
          }
        }
      }),
      proficiencies: this.baseStats.proficiencies.map(proficiency => {
        const proficiencyStats = proficiencyData[proficiency]
        if (!proficiencyStats) {
          console.error('Proficiency Not Found', proficiency)
          return proficiency
        } else {
          return proficiencyStats
        }
      }),
      actions: {
        ...actions.actions,
        ...filter(this.baseStats.features, ({ type }) => type.includes('action'))
          .map(feature => ({
            ...feature,
            feature: true,
            cardinal: feature.type.includes('cardinal')
          })) 
      },
      maneuvers: {
        ...actions.maneuvers,
        ...filter(this.baseStats.features, ({ type }) => type.includes('maneuver'))
          .map(feature => ({ ...feature, feature: true })) 
      },
      reactions: {
        ...actions.reactions,
        ...filter(this.baseStats.features, ({ type }) => type.includes('reaction'))
          .map(feature => ({ ...feature, feature: true })) 
      }
    }
   } else {
     return {}
   }
  }

  get shop () {
    return this.baseShop
  }

  get exportData () {
    return {
      ...pick(this, ['name', 'portrait', 'bio']),
      stats: this.baseStats,
      shop: this.baseShop
    }
  }
}

export default Character