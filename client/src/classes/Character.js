import { mapValues } from 'lodash'
import weaponData from '../gameData/weapons.json'
import skillData from '../gameData/skills.json'
import equipmentProficiencyData from '../gameData/equipmentProficiencies.json'
import actions from '../gameData/actions.json'
import { pick, filter, upperFirst, reject } from 'lodash'

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
          current: (
            (equipment.heavy.reduce((acc, { quantity }) => quantity + acc, 0)) +
            (equipment.medium.reduce((acc, { quantity }) => quantity + acc, 0) / 2) +
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
            damage: weaponStats.damageDie + (bonus >= 0 ? " + " : " - ") + Math.abs(bonus)
          }
        }
      }),
      proficiencies: {
        languages: this.baseStats.proficiencies.languages,
        equipment: this.baseStats.proficiencies.equipment.map(proficiency => {
          const equipmentProficiencyStats = equipmentProficiencyData[proficiency.category]
          if (!equipmentProficiencyStats) {
            console.error('Equipment Proficiency Not Found', proficiency)
            return proficiency
          } else {
            return {
              ...proficiency,
              ...equipmentProficiencyStats
            }
          }
        }),
      },
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
      stats: {
        ...this.baseStats,
        weapons: reject(this.baseStats.weapons, 'deleted'),
        features: reject(this.baseStats.features, 'deleted'),
        equipment: {
          ...this.baseStats.equipment,
          heavy: reject(this.baseStats.equipment.heavy, 'deleted'),
          medium: reject(this.baseStats.equipment.heavy, 'deleted'),
          light: reject(this.baseStats.equipment.heavy, 'deleted')
        },
        proficiencies: {
          ...this.baseStats.proficiencies,
          languages: reject(this.baseStats.proficiencies.languages, 'deleted'),
          equipment: reject(this.baseStats.proficiencies.equipment, 'deleted')
        }
      },
      shop: this.baseShop
    }
  }
}

export default Character