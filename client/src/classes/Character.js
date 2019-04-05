import armorData from '../gameData/armor.json'
import shieldData from '../gameData/shields.json'
import weaponData from '../gameData/weapons.json'
import skillData from '../gameData/skills.json'
import equipmentProficiencyData from '../gameData/equipmentProficiencies.json'
import actionsData from '../gameData/actions.json'
import conditionData from '../gameData/conditions.json'
import withoutIndex from '../utils/withoutIndex'
import addPlus from '../utils/addPlus'
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
  flatMap,
  isEqual
} from 'lodash'



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
    this.notes = baseCharacterData.notes
  }

  get armor () {
    const categoryData = keyBy(armorData, 'category')
    return {
      ...this.baseStats.armor,
      ...categoryData[this.baseStats.armor.category],
      options: chain(armorData).filter(({proficiency}) =>
        this.baseStats.proficiencies.equipment.map(({category}) => category)
        .includes(proficiency) || proficiency === 'none'
      ).map(({ displayName, category }) => ({ label: displayName, value: category })).value(),
      hasFeatures: this.baseStats.features.some(({ equipmentTags }) =>
        equipmentTags.includes(categoryData[this.baseStats.armor.category].proficiency)
      ),
      features: mapValues(categoryData, ({proficiency}) => this.baseStats.features.filter(({ equipmentTags }) =>
        equipmentTags.includes(proficiency)
      ))
    }
  }

  get conditions () {
    return this.baseStats.conditions.map(condition => {
      const categoryData = conditionData[condition.name]
      if (!categoryData) throw new Error(`Condition not recognized: ${JSON.stringify(condition.name)}`)
      return { ...condition, ...categoryData}
    })
  }

  get skills () {
    return chain(skillData).keyBy('name').mapValues(skill => {
      const value = skill.abilityScores.reduce((acc, ability) => acc + this.baseStats.abilityScores[ability], 0)
      const isModified = skill.name === 'stealth' && this.armor.stealthPenalty !== 0
      const modifiedValue = skill.name === 'stealth' ? value + this.armor.stealthPenalty : value
      const modifierText = this.armor.name +  ': ' + this.armor.stealthPenalty
      const features = this.baseStats.features.filter(({ skillTags }) => skillTags.includes(skill.name))
      const conditions = this.conditions.filter(({ skillTags }) => skillTags.includes(skill.name))
      let mode = ''
      if (conditions.length > 0) mode = 'warning'
      else if (features.length > 0) mode = 'primary'
      return {
        ...skill,
        value: modifiedValue,
        passive: modifiedValue + 10,
        displayValue: addPlus(modifiedValue),
        features,
        conditions,
        modifiers: isModified ? modifierText : '',
        mode
      }
    }).value()
  }

  get loadout () {
    const equippedWeapons = this.weapons.filter(({ isEquipped, tags }) => isEquipped && !tags.includes('unarmed'))
    const magics = equippedWeapons.filter(({ magic }) => magic).map(({ magic }) => magic)
    let hands = equippedWeapons.map(({ hands }) => hands)
    if (hands[0] === 'two') hands.push('two')
    if (this.baseStats.shield.category !== 'none') hands.push('any')

    return { hands, magics }
  }

  get shield () {
    const shieldCategoryData = keyBy(shieldData, 'category')
    const shieldCatStats = shieldCategoryData[this.baseStats.shield.category]
    const rating = addPlus(shieldCatStats.rating + (shieldCatStats.skill ? this.skills[shieldCatStats.skill].value : 0))

    const proficientShields = shieldData.filter(({proficiency}) =>
      this.baseStats.proficiencies.equipment.map(({category}) => category).includes(proficiency)
    )
    const noShield = shieldData.find(({ proficiency }) => proficiency === 'none')
    const options = [
      ...proficientShields,
      noShield
    ].map(({ displayName, category }) => ({ label: displayName, value: category }))

    const hasFeatures =  this.baseStats.features.some(({ equipmentTags }) =>
      equipmentTags.includes(shieldCategoryData[this.baseStats.shield.category].proficiency)
    )

    const features = mapValues(shieldCategoryData, ({proficiency}) => this.baseStats.features.filter(({ equipmentTags }) =>
      equipmentTags.includes(proficiency)
    ))

    return {
      ...this.baseStats.shield,
      ...shieldCatStats,
      rating,
      options,
      hasShieldProficiency: proficientShields.length > 0,
      hasFeatures,
      features
    }
  }

  get speed () {
    const modifiers = [
      ...this.conditions.filter(({ speedModifier }) => speedModifier),
      ...this.baseStats.features.filter(({ speedModifier }) => speedModifier),
      ...this.shield.speedModifier ? [this.shield] : []
    ]
    const modifierValues = modifiers.map(({ speedModifier }) => speedModifier)
    const modifierNames = modifiers.map(({ name, displayName }) => name || displayName)
    let rating
    if (modifierValues.includes('set0')) {
      rating = 0
    } else if (modifierValues.includes('set5')) {
      rating = 5
    } else {
      rating = Math.max(5, 20 +
        (5 * modifierValues.filter(mod => mod === 'add5').length) +
        (-5 * modifierValues.filter(mod => mod === 'subtract5').length)
      )
    }

    return {
      ...this.baseStats.speed,
      rating,
      modifierNames
    }
  }

  get weapons () {
    return this.baseStats.weapons.map(weapon => {
      const weaponStats = weaponData[weapon.category]
      if (!weaponStats) {
        console.error("Weapon Type not found", weapon)
        return weapon
      } else {
        const bonus = this.skills[weaponStats.skill].value
        return {
          ...weapon,
          ...weaponStats,
          name: weapon.name || weaponStats.displayName,
          notes: [
            ...(weaponStats.tags ? weaponStats.tags.map(upperFirst) : []),
            ...this.baseStats.features
              .filter(({ equipmentTags }) => equipmentTags.includes(weaponStats.proficiency))
              .map(({ name }) => name),
            ...this.conditions
              .filter(({ equipmentTags }) => equipmentTags.includes(weaponStats.proficiency))
              .map(({ name }) => name)
          ].join(', '),
          bonus: addPlus(bonus),
          damage: weaponStats.damageDie + ' ' + addPlus(bonus, true)
        }
      }
    })
  }

  get equipment () {
    const equipment = {
      ...this.baseStats.equipment,
      ...transform(['heavy', 'medium', 'light'], (acc, category) => acc[category] = [
        ...this.baseStats.equipment[category],
        ...this.weapons.filter(({weight}) => (weight === category)).map(weapon => ({
          name: weapon.name,
          quantity: 1,
          category: 'weapon'
        })),
        ...this.armor.weight === category ? [{
          name: this.armor.name || this.armor.displayName,
          quantity: 1,
          category: 'armor'
        }] : [],
        ...this.shield.weight === category ? [{
          name: this.shield.name || this.shield.displayName,
          quantity: 1,
          category: 'shield'
        }] : []
      ])
    }
    return {
      ...equipment,
      encumberance: {
        current: (
          (countItems(equipment.heavy) * 2) + countItems(equipment.medium) +
          (countItems(equipment.light) / 10) + (Math.max(equipment.gold, 0) / 1000)
        ),
        limit: this.skills.brawn.passive
      }
    }
  }

  isMeetingRequirements = requirements => {
    return !Array.isArray(requirements) || requirements.every(requirement => {
      if (requirement.type === 'loadout') {
        return Array.isArray(requirement.hands) ? isEqual(this.loadout.hands, requirement.hands) : this.loadout.hands.length < 2
      }
      return true
    })
  }

  get actions () {
    const maneuvers = this.loadout.hands.length < 2 ? { maneuvers: 'maneuver' } : {}
    const actionMapping = {
      cardinalActions: 'cardinalAction',
      skillActions: 'skillAction',
      basicActions: 'basicAction',
      ...maneuvers,
      reactions: 'reaction'
    }
    return transform(actionMapping, (acc, actionType, columnName) => acc[columnName] = [
      ...actionsData[columnName]
        .filter(({ requirements }) => this.isMeetingRequirements(requirements))
        .map(({ name, description }) => {
          const features = this.baseStats.features.filter(({ actionTags }) => actionTags.includes(name))
          const conditions = this.conditions.filter(({ actionTags }) => actionTags.includes(name))
          let mode = ''
          if (conditions.length > 0) mode = 'warning'
          else if (features.length > 0) mode = 'primary'
          return {
            name,
            description,
            features,
            conditions,
            mode
          }
        }),
      ...filter(this.baseStats.features, feature => feature.actionType === actionType)
        .map(feature => ({ ...feature, mode: 'primary' })),
      ...chain(this.baseStats.conditions)
        .map(condition => ({ ...condition, ...conditionData[condition.name]}))
        .filter(({ action }) => action && (action.category === actionType))
        .map(({ action }) => ({ ...action, mode: 'warning' }))
        .value()
    ], {})
  }

  get stats () {
   if (this.baseStats) {
    return {
      ...this.baseStats,
      base: this.baseStats,
      maxHP: this.skills.fortitude.passive,
      maxOverheal: (this.baseStats.wounds > 0 ? 2 : 0) * (this.skills.fortitude.passive),
      maxWounds: 5,
      isDying: this.baseStats.wounds > 4,
      evasion: addPlus(this.skills.agility.value),
      armor: this.armor,
      shield: this.shield,
      speed: this.speed,
      abilityScores: mapValues(this.baseStats.abilityScores, value => ({ value, displayValue: addPlus(value)})),
      skills: this.skills,
      equipment: this.equipment,
      weapons: this.weapons,
      loadout: this.loadout,
      isHoldingOneLightWeapon: this.isHoldingOneLightWeapon,
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
            const features = this.baseStats.features.filter(({equipmentTags}) => equipmentTags.includes(proficiency.category))
            return {
              ...proficiency,
              ...equipmentProficiencyStats,
              features
            }
          }
        }),
      },
      actions: this.actions,
      conditions: this.conditions
    }
   } else {
     return {}
   }
  }

  equipmentIncludesAny = (searchStrings) => chain(equipmentProficiencyData)
    .pickBy((proficiency, name) => !some(this.baseStats.proficiencies.equipment, ({ category }) => category === name))
    .filter((proficiency, name) => some(searchStrings, searchString => lowerCase(name).includes(lowerCase(searchString))))
    .map(proficiency => ({
      ...proficiency,
      meetingRequirementsMessage: proficiency.requirements && proficiency.requirements
        .filter(({ skill, level }) => this.skills[skill].value < level)
        .map(({ skill }) => startCase(skill) + ' is ' + addPlus(this.skills[skill].value))
        .join(', '),
      requirementsString: proficiency.requirements ? (
        proficiency.requirements.map(({ skill, level }) => startCase(skill) + ' ' + addPlus(level)).join(', ')
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
                { path: `stats.proficiencies.${type}`, value: withoutIndex(this.baseStats.proficiencies[type], index) },
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
