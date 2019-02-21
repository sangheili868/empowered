import _ from 'lodash'
import weaponData from '../gameData/weapons.json'
import skillData from '../gameData/skills.json'

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
    const skills = _.mapValues(skillData, skill => 
      skill.reduce((acc, ability) =>  acc + this.baseStats.abilityScores[ability], 0)
    )
    const equipment = this.baseStats.equipment
    return {
      ...this.baseStats,
      maxHP: skills.fortitude + 10,
      maxTempHP: skills.fortitude + 10,
      maxWounds: 5, 
      skills,
      encumberance: {
        current: (equipment.heavy.length +
          (equipment.medium.length / 2) +
          (equipment.light.reduce((acc, { quantity }) => quantity + acc, 0) / 20) +
          (equipment.gold / 2000)
        ),
        limit: skills.brawn + 10
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
            bonus,
            damage: weaponStats.damageDie + (bonus > 0 ? " + " : " - ") + Math.abs(bonus)
          }
        }
      })
    }
   }
  }
}

export default Character