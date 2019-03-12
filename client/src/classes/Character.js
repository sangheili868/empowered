import weaponData from '../gameData/weapons.json'
import skillData from '../gameData/skills.json'
import equipmentProficiencyData from '../gameData/equipmentProficiencies.json'
import actionsData from '../gameData/actions.json'
import conditionData from '../gameData/conditions.json'
import { upperFirst, transform, map, startCase, pick, reject, chain, some, lowerCase, filter } from 'lodash'
import equipmentProficiencies from '../gameData/equipmentProficiencies.json'

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
    const skills = chain(skillData).keyBy('name').mapValues(({abilityScores}) =>
      abilityScores.reduce((acc, ability) => acc + this.baseStats.abilityScores[ability], 0)
    ).value()
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
            ...weapon,
            ...weaponStats,
            notes: weaponStats.tags && weaponStats.tags.map(upperFirst).join(', '),
            bonus,
            damage: weaponStats.damageDie + (bonus >= 0 ? " + " : " - ") + Math.abs(bonus)
          }
        }
      }),
      availableWeapons: chain(weaponData).pickBy(({proficiency}) =>
        this.baseStats.proficiencies.equipment.map(({category}) => category)
        .includes(proficiency)
      ).map(({ displayName }, key) => ({ displayName, key })).value(),
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
      actions: transform({
        cardinalActions: 'cardinalAction',
        skillActions: 'skillAction',
        basicActions: 'basicAction',
        maneuvers: 'maneuver',
        reactions: 'reaction'
      }, (acc, actionType, columnName) => acc[columnName] = [
        ...actionsData[columnName],
        ...filter(this.baseStats.features, ({ actionTag }) => actionTag === actionType)
          .map(feature => ({ ...feature, name: feature.name + '*', feature: true})),
        ...chain(this.baseStats.conditions).map(condition => ({ ...condition, ...conditionData[condition.name]}))
          .filter(({ deleted=false, action: { category } }) => !deleted && (category === actionType)).map('action').value()
      ], {}),
      conditions: this.baseStats.conditions.map(condition => ({ ...condition, ...conditionData[condition.name]}))
    }
   } else {
     return {}
   }
  }

  equipmentIncludesAny = (searchStrings) => chain(equipmentProficiencies)
    .pickBy((value, key) => !some(this.baseStats.proficiencies.equipment, ({ category, deleted }) => ((category === key) && !deleted)))
    .filter((value, key) => some(searchStrings, searchString => lowerCase(key).includes(lowerCase(searchString))))
    .value()

  get shop () {
    if (this.baseShop) {
      const smallerDie = {
        d6s: 'd4s',
        d8s: 'd6s',
        d10s: 'd8s',
        d12s: 'd10s'
      }
      return {
        ...this.baseShop,
        abilityScores: map(this.baseStats.abilityScores, (current, name) => ({
          name: startCase(name),
          current,
          cost: Math.max(1, current + 1),
          worth: Math.max(1, current)
        })),
        powerDice: map(this.baseStats.powerDice, ({ max }, dieName) => ({
          name: dieName.slice(0,-1),
          current: max,
          ...(dieName === 'd4s') ? {
            cost: Math.max(1, Object.values(this.baseStats.powerDice).reduce(((acc, {max}) => acc + max), 0)),
            worth: Math.max(1, Object.values(this.baseStats.powerDice).reduce(((acc, {max}) => acc + max), 0) - 1),
          } : {
            cost: 1,
            worth: 1,
            smallerDie: smallerDie[dieName],
            smallerDieCount: this.baseStats.powerDice[smallerDie[dieName]].max
          }
        })),
        proficiencies: {
          armor: this.equipmentIncludesAny(['armor', 'shield']),
          meleeWeapon: this.equipmentIncludesAny(['unarmedMeleeWeapon', 'meleeWeapon']),
          rangedWeapon: this.equipmentIncludesAny(['rangedWeapon', 'loadingWeapon']),
          otherWeapon: this.equipmentIncludesAny(['thrownWeapon', 'craftedWeapon', 'magicWeapon']),
          tool: this.equipmentIncludesAny(['tool']),
          vehicle: this.equipmentIncludesAny(['vehicle'])
        }
      }
    } else {
      return {}
    }
  }

  get exportData () {
    return {
      ...pick(this, ['name', 'portrait', 'bio']),
      stats: {
        ...this.baseStats,
        weapons: reject(this.baseStats.weapons, 'deleted'),
        features: reject(this.baseStats.features, 'deleted'),
        conditions: reject(this.baseStats.conditions, 'deleted'),
        equipment: {
          ...this.baseStats.equipment,
          heavy: reject(this.baseStats.equipment.heavy, 'deleted'),
          medium: reject(this.baseStats.equipment.medium, 'deleted'),
          light: reject(this.baseStats.equipment.light, 'deleted')
        },
        proficiencies: {
          ...this.baseStats.proficiencies,
          languages: reject(this.baseStats.proficiencies.languages, 'deleted'),
          equipment: reject(this.baseStats.proficiencies.equipment, 'deleted')
        }
      },
      shop: {
        ...this.baseShop,
        features: reject(this.baseShop.features, 'deleted')
      }
    }
  }
}

export default Character
