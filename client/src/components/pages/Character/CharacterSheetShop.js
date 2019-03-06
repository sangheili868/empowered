import React, { Component } from 'react'
import CharacterSheetTable from './CharacterSheetTable'
import {
  stats,
  resources,
  tableBuy,
  plus,
  minus,
  section,
  title,
  languages,
  newLanguage
} from './CharacterPage.module.scss'
import CharacterSheetResource from './CharacterSheetResource'
import advancementsIcon from "../../../icons/chevron.png"
import { chain, some, lowerCase, cloneDeep, map, startCase } from 'lodash'
import EmpButton from '../../EmpButton/EmpButton'
import equipmentProficiencies from '../../../gameData/equipmentProficiencies.json'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'

class CharacterSheetShop extends Component {
  equipmentIncludesAny = (searchStrings) => chain(equipmentProficiencies)
    .pickBy((value, key) => !some(this.props.stats.proficiencies.equipment, ({ category }) => (category === key)))
    .filter((value, key) => some(searchStrings, searchString => lowerCase(key).includes(lowerCase(searchString))))
    .value()
  organizedProficiencies = () => ({
    armor: this.equipmentIncludesAny(['armor', 'shield']),
    meleeWeapon: this.equipmentIncludesAny(['unarmedWeapon', 'meleeWeapon']),
    rangedWeapon: this.equipmentIncludesAny(['rangedWeapon', 'loadingWeapon']),
    otherWeapon: this.equipmentIncludesAny(['thrownWeapon', 'magicWeapon']),
    tool: this.equipmentIncludesAny(['tool']),
    vehicle: this.equipmentIncludesAny(['vehicle'])
  })
  render () {
    return (
      <>
        <div className={stats}>
          <div className={resources}>
            <CharacterSheetResource
              title="Advancements"
              value={this.props.shop.advancements}
              onUpdate={(value) => this.props.onUpdate({shop: { advancements: value}})}
              alt="Advancements Icon"
              icon={advancementsIcon}
            />
          </div>
        </div>
        <div className={stats}>
          <CharacterSheetTable
            title="Ability Scores"
            items={this.props.shop.abilityScores}
            columnNames={{
              name: 'Name',
              current: 'Current'
            }}
            buyButton={index => {
              const score = this.props.shop.abilityScores[index]
              if (score.current > 4) {
                return 'At Maximum'
              } else if (score.cost > this.props.shop.advancements) {
                return `Costs ${score.cost} adv.`
              } else {
                return (
                  <EmpButton
                    className={[tableBuy, plus].join(' ')}
                    onClick={this.props.onUpdate.bind(this, {
                      shop: {advancements: this.props.shop.advancements - score.cost},
                      stats: {abilityScores: { [lowerCase(score.name)]: score.current + 1 }}
                    })}
                  >
                    -{score.cost} Adv.
                  </EmpButton>
                )
              }
            }}
            sellButton={index => {
              const score = this.props.shop.abilityScores[index]
              return (score.current <= -3) ? 'At Minimum' : (
                <EmpButton
                  className={[tableBuy, minus].join(' ')}
                  onClick={this.props.onUpdate.bind(this, {
                    shop: {advancements: this.props.shop.advancements + score.worth},
                    stats: {abilityScores: { [lowerCase(score.name)]: score.current - 1 }}
                  })}
                >
                  +{score.worth} Adv.
                </EmpButton>
              )
            }}
          />
          <CharacterSheetTable
            title="Power Dice"
            items={this.props.shop.powerDice}
            columnNames={{
              name: 'Name',
              current: 'Current'
            }}
            buyButton={index => {
              const die = this.props.shop.powerDice[index]
              if (die.smallerDieCount < 1) {
                return `No ${die.smallerDie}`
              } else if (die.cost > this.props.shop.advancements) {
                return `Costs ${die.cost} adv.`
              } else {
                return (
                  <EmpButton
                    className={[tableBuy, plus].join(' ')}
                    onClick={this.props.onUpdate.bind(this, {
                      shop: {advancements: this.props.shop.advancements - die.cost},
                      stats: {powerDice: {
                        [die.name + 's']: {
                          current: die.current + 1,
                          max: die.current + 1
                        },
                        ...(die.name === 'd4') ? {} : {
                          [die.smallerDie]: {
                            current: die.smallerDieCount -1,
                            max: die.smallerDieCount - 1
                          }
                        }
                      }}
                    })}
                  >
                    -{die.cost} Adv.
                  </EmpButton>
                )
              }
            }}
            sellButton={index => {
              const die = this.props.shop.powerDice[index]
              return (die.current === 0) ? 'At Minimum' : (
                <EmpButton
                  className={[tableBuy, minus].join(' ')}
                  onClick={this.props.onUpdate.bind(this, {
                    shop: {advancements: this.props.shop.advancements + die.worth},
                    stats: {powerDice: {
                      [die.name + 's']: {
                        current: die.current - 1,
                        max: die.current - 1
                      },
                      ...(die.name === 'd4') ? {} : {
                        [die.smallerDie]: {
                          current: die.smallerDieCount + 1,
                          max: die.smallerDieCount + 1
                        }
                      }
                    }}
                  })}
                >
                  +{die.worth} Adv.
                </EmpButton>
              )
            }}
          />
          <CharacterSheetTable
            title="Features"
            addText="Add a feature to your shop"
            items={this.props.shop.features}
            columnNames={{
              name: 'Name',
              description: 'Description'
            }}
            fields={{ name: '', description: '', type: '', cost: 1 }}
            onEdit={(index, values) => {
              let newFeatures = cloneDeep(this.props.shop.features)
              newFeatures[index] = values
              this.props.onUpdate({ shop: { features: newFeatures } })
            }}
            onAdd={values => this.props.onUpdate({ shop: { features: [
              ...this.props.shop.features,
              {
                ...values,
                type: values.type.split(' ')
              }
            ]}})}
            buyButton={index => {
              const feature = cloneDeep(this.props.shop.features[index])
              if (feature.cost > this.props.shop.advancements) {
                return `Costs ${feature.cost} adv.`
              } else {
                return (
                  <EmpButton
                    className={[tableBuy, plus].join(' ')}
                    onClick={() => {
                      let newFeatures = cloneDeep(this.props.shop.features)
                      newFeatures[index].deleted = true
                      this.props.onUpdate({
                        shop: {
                          advancements: this.props.shop.advancements - feature.cost,
                          features: newFeatures
                        },
                        stats: { features: [
                          ...this.props.stats.features,
                          feature
                        ]}
                      })
                    }}
                  >
                    -{feature.cost} Adv.
                  </EmpButton>
                )
              }
            }}
          />
          {map(this.organizedProficiencies(), (proficiencies, grouping) =>
              <CharacterSheetTable
                key={grouping}
                title={startCase(grouping) + ' Proficiencies'}
                items={proficiencies}
                columnNames={{
                  name: 'Name'
                }}
                buyButton={index => {
                  const proficiency = proficiencies[index]
                  if (1 > this.props.shop.advancements) {
                    return `Costs ${1} adv.`
                  } else {
                    return (
                      <EmpButton
                        className={[tableBuy, plus].join(' ')}
                        onClick={() => {
                          this.props.onUpdate({
                            shop: { advancements: this.props.shop.advancements - 1 },
                            stats: { proficiencies: { equipment: [
                              ...this.props.stats.proficiencies.equipment,
                              proficiency
                            ]}}
                          })
                        }}
                      >
                        -1 Adv.
                      </EmpButton>
                    )
                  }
                }}
              />
          )}
          <div>
            <div className={section}>
              <div className={title}>Languages</div>
              {this.props.stats.proficiencies.languages.length < this.props.stats.skills.synergy ? (
                <div className={languages}>
                  <div>Learn a new language:</div>
                  <EmpItemEditor
                    title="Add a Language"
                    fields={{ name: '' }}
                    onUpdate={language => {
                      this.props.onUpdate({
                        shop: { advancements: this.props.shop.advancements - 1 },
                        stats: { proficiencies: { languages: [
                          ...this.props.stats.proficiencies.languages,
                          language
                        ]}}
                      })
                    }}
                    isCustomInline
                  >
                    <EmpButton className={newLanguage}>-1 Adv.</EmpButton>
                  </EmpItemEditor>
                </div>
              ) : (
                <div className={languages}>
                  You know {this.props.stats.proficiencies.languages.length} languages already.
                  Increase your synergy to learn more.
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default CharacterSheetShop