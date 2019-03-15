import armorData from '../gameData/armor.json'
import shieldData from '../gameData/shields.json'
import weaponData from '../gameData/weapons.json'
import skillData from '../gameData/skills.json'
import equipmentProficiencyData from '../gameData/equipmentProficiencies.json'
import actionsData from '../gameData/actions.json'
import conditionData from '../gameData/conditions.json'
import withoutIndex from '../utils/withoutIndex'
import {
  upperFirst,
  transform,
  map,
  startCase,
  pick,
  chain,
  some,
  lowerCase,
  filter,
  mapValues,
  keyBy,
  flatMap
} from 'lodash'

function addPlus (value) {
  return (value >= 0 ? '+' : '') + value
}

function countItems (items) {
  return chain(items).reduce((total, { quantity }) => quantity + total, 0).value()
}

class Character {
  constructor(baseCharacterData) {
    this.name = baseCharacterData.name
    this.portrait = baseCharacterData.portrait
    this.bio = baseCharacterData.bio
    this.baseStats = baseCharacterData.stats
    this.baseShop = baseCharacterData.shop
  }

  get armor () {
    return {
      ...this.baseStats.armor,
      ...keyBy(armorData, 'category')[this.baseStats.armor.category],
      options: chain(armorData).filter(({proficiency}) =>
        this.baseStats.proficiencies.equipment.map(({category}) => category)
        .includes(proficiency) || proficiency === 'none'
      ).map(({ displayName, category }) => ({ label: displayName, value: category })).value(),
    }
  }

  get skills () {
    return chain(skillData).keyBy('name').mapValues(skill => {
      const value = skill.abilityScores.reduce((acc, ability) => acc + this.baseStats.abilityScores[ability], 0)
      const isModified = skill.name === 'stealth' && this.armor.stealthPenalty !== 0
      const modifiedValue = skill.name === 'stealth' ? value + this.armor.stealthPenalty : value
      const modifierText = this.armor.name +  ': ' + this.armor.stealthPenalty
      return {
        ...skill,
        value: modifiedValue,
        displayValue: addPlus(modifiedValue),
        features: this.baseStats.features.filter(({ skillTags }) => skillTags.includes(skill.name)),
        modifiers: isModified ? modifierText : ''
      }
    }).value()
  }

  get stats () {
   if (this.baseStats) {
    const shieldCatStats = keyBy(shieldData, 'category')[this.baseStats.shield.category]
    const shield = {
      ...this.baseStats.shield,
      ...shieldCatStats,
      rating: addPlus(shieldCatStats.rating + (shieldCatStats.skill ? this.skills[shieldCatStats.skill].value : 0)),
      options: chain(shieldData).filter(({proficiency}) =>
        this.baseStats.proficiencies.equipment.map(({category}) => category)
        .includes(proficiency) || proficiency === 'none'
      ).map(({ displayName, category }) => ({ label: displayName, value: category })).value(),
    }
    const equipment = {
      ...this.baseStats.equipment,
      ...transform(['heavy', 'medium', 'light'], (acc, category) => acc[category] = [
        ...this.baseStats.equipment[category],
        ...this.baseStats.weapons.filter(({weight}) => (weight === category)).map(weapon => ({
          name: weapon.name,
          quantity: 1,
          category: 'weapon'
        })),
        ...this.armor.weight === category ? [{
          name: this.armor.name,
          quantity: 1,
          category: 'armor'
        }] : [],
        ...shield.weight === category ? [{
          name: shield.name,
          quantity: 1,
          category: 'shield'
        }] : []
      ])
    }
    return {
      ...this.baseStats,
      base: this.baseStats,
      maxHP: this.skills.fortitude.value + 10,
      maxTempHP: this.skills.fortitude.value + 10,
      maxWounds: 5,
      armor: this.armor,
      shield,
      speed: {
        ...this.baseStats.speed,
        rating: this.baseStats.speed.baseValue + shield.speedPenalty,
        modifier: (shield.speedPenalty !== 0) ? shield.name + ': ' + addPlus(shield.speedPenalty) : ''
      },
      abilityScores: mapValues(this.baseStats.abilityScores, value => ({ value, displayValue: addPlus(value)})),
      skills: this.skills,
      equipment: {
        ...equipment,
        encumberance: {
          current: (
            (countItems(equipment.heavy) * 2) + countItems(equipment.medium) +
            (countItems(equipment.light) / 10) + (equipment.gold / 1000)
          ),
          limit: this.skills.brawn.value + 10
        }
      },
      weapons: this.baseStats.weapons.map(weapon => {
        const weaponStats = weaponData[weapon.category]
        if (!weaponStats) {
          console.error("Weapon Type not found", weapon)
          return weapon
        } else {
          const bonus = this.skills[weaponStats.skill].value
          return {
            ...weapon,
            ...weaponStats,
            notes: [
              ...(weaponStats.tags ? weaponStats.tags.map(upperFirst) : []),
              ...this.baseStats.features
                .filter(({ equipmentTags }) => equipmentTags.includes(weaponStats.proficiency))
                .map(({ name }) => name)
            ].join(', '),
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
        ...actionsData[columnName].map(({ name, description }) => {
          const relatedFeatures = filter(this.baseStats.features, feature => feature.actionTags.includes(name))
          return {
            rootName: name,
            name: relatedFeatures.length > 0 ? name + ' *' : name,
            description,
            features: relatedFeatures
          }
        }),
        ...filter(this.baseStats.features, feature => feature.actionType === actionType)
          .map(feature => ({ ...feature, rootName: feature.name, name: feature.name + '*', feature: true})),
        ...chain(this.baseStats.conditions).map(condition => ({ ...condition, ...conditionData[condition.name]}))
          .filter(({ action: { category } }) => (category === actionType)).map('action').value()
      ], {}),
      conditions: this.baseStats.conditions.map(condition => ({ ...condition, ...conditionData[condition.name]}))
    }
   } else {
     return {}
   }
  }

  equipmentIncludesAny = (searchStrings) => chain(equipmentProficiencyData)
    .pickBy((value, key) => !some(this.baseStats.proficiencies.equipment, ({ category }) => category === key))
    .filter((value, key) => some(searchStrings, searchString => lowerCase(key).includes(lowerCase(searchString))))
    .map(value => ({
      ...value,
      isDisabled: some(value.requirements, ({ skill, level }) => this.skills[skill].value < level),
      meetingRequirementsMessage: value.requirements && value.requirements
        .filter(({ skill, level }) => this.skills[skill].value < level)
        .map(({ skill }) => startCase(skill) + ' is ' + addPlus(this.skills[skill].value))
        .join(', '),
      requirementsString: value.requirements ? (
        value.requirements.map(({ skill, level }) => startCase(skill) + ' ' + addPlus(level)).join(', ')
      ) : 'None'
    }))
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
        base: this.baseShop,
        abilityScores: map(this.baseStats.abilityScores, (value, name) => ({
          name: startCase(name),
          value,
          displayValue: addPlus(value),
          cost: Math.max(1, value + 1),
          worth: Math.max(1, value)
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
        },
        sellBack: [
          ...flatMap(this.baseStats.proficiencies, (proficiencies, type) => proficiencies
            .map(({ name, category }, index) => ({
              name: (type === 'languages') ? name : equipmentProficiencyData[category].name,
              worth: (type === 'languages') ? 0 : 1,
              category,
              type: startCase(type),
              handleDelete: updateCharacter => updateCharacter([
                { path: ['stats', 'proficiencies', type ], value: withoutIndex(this.baseStats.proficiencies[type], index) },
                ...(type === 'languages') ? [] : [
                  { path: 'shop.advancements', value: parseInt(this.baseShop.advancements) + 1 },
                ]
              ])
            })).filter(({ category }) => category !== 'improvisedWeapon')
          ),
          ...this.baseStats.features.map(({ name, cost }, index) => ({
            name,
            worth: cost,
            type: 'Feature',
            handleDelete: updateCharacter => updateCharacter([
              { path: 'shop.features', value: [ ...this.baseShop.features, this.baseStats.features[index] ] },
              { path: 'shop.advancements', value: parseInt(this.baseShop.advancements) + (cost || 0) },
              { path: 'stats.features', value: withoutIndex(this.baseStats.features, index) },
            ])
          }))
        ]
      }
    } else {
      return {}
    }
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
