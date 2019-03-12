import React, { Component } from 'react'
import CharacterSheetTable from './CharacterSheetTable'
import {
  stats,
  resources,
  tableBuy,
  plus,
  minus,
  languages,
  newLanguage,
  unlockText
} from './CharacterPage.module.scss'
import CharacterSheetResource from './CharacterSheetResource'
import advancementsIcon from "../../../icons/chevron.png"
import { lowerCase, cloneDeep, map, startCase } from 'lodash'
import EmpButton from '../../EmpButton/EmpButton'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import EmpCard from '../../EmpCard/EmpCard'
import featureFields from '../../../gameData/featureFields'

class CharacterSheetShop extends Component {
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
              const isIncreasingHP = ['strong', 'determined'].includes(lowerCase(score.name))
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
                      stats: {
                        abilityScores: { [lowerCase(score.name)]: score.current + 1 },
                        hitPoints: this.props.stats.hitPoints + (isIncreasingHP ? 1 : 0)
                      }
                    })}
                  >
                    -{score.cost} Adv.
                  </EmpButton>
                )
              }
            }}
            sellButton={index => {
              const score = this.props.shop.abilityScores[index]
              const isDecreasingHP = ['strong', 'determined'].includes(lowerCase(score.name))
              return (score.current <= -3) ? 'At Minimum' : (
                <EmpButton
                  className={[tableBuy, minus].join(' ')}
                  onClick={this.props.onUpdate.bind(this, {
                    shop: {advancements: this.props.shop.advancements + score.worth},
                    stats: {
                      abilityScores: { [lowerCase(score.name)]: score.current - 1 },
                      hitPoints: Math.max(0, this.props.stats.hitPoints + (isDecreasingHP ? -1 : 0))
                    }
                  })}
                >
                  +{score.worth} Adv.
                </EmpButton>
              )
            }}
          />
          {this.props.shop.unlocked &&
            <>
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
                fields={featureFields}
                onEdit={(index, values) => {
                  let newFeatures = cloneDeep(this.props.shop.features)
                  newFeatures[index] = {
                    ...values
                  }
                  this.props.onUpdate({ shop: { features: newFeatures } })
                }}
                onAdd={values => this.props.onUpdate({ shop: { features: [
                  ...this.props.shop.features,
                  {
                    ...values
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
              {map(this.props.shop.proficiencies, (proficiencies, grouping) =>
                  <CharacterSheetTable
                    key={grouping}
                    title={startCase(grouping) + ' Proficiencies'}
                    items={proficiencies}
                    columnNames={{
                      name: 'Name'
                    }}
                    tooltips={{
                      name: {
                        title: 'name',
                        body: 'description'
                      }
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
              <EmpCard isStartingOpen title="Languages">
                {(
                  this.props.stats.proficiencies.languages.filter(language => !language.deleted).length <
                  Math.max(2, this.props.stats.skills.synergy)
                ) ? (
                  <div className={languages}>
                    <div>Learn a new language:</div>
                    <EmpItemEditor
                      title="Add a Language"
                      fields={{ name: '' }}
                      onUpdate={language => {
                        this.props.onUpdate({
                          stats: { proficiencies: { languages: [
                            ...this.props.stats.proficiencies.languages,
                            language
                          ]}}
                        })
                      }}
                      isCustomInline
                    >
                      <EmpButton className={newLanguage}>Free</EmpButton>
                    </EmpItemEditor>
                  </div>
                ) : (
                  <div className={languages}>
                    You know {
                      this.props.stats.proficiencies.languages.filter(language => !language.deleted).length
                    } languages already.
                    Increase your smart or social to learn more.
                  </div>
                )}
              </EmpCard>
            </>
          }
        </div>
        {!this.props.shop.unlocked &&
          <div>
            <div className={unlockText}>
              Once your DM adds features to your shop, you will be able to purchase power
              dice, features, proficiencies. Alternatively, click below to unlock the full
              shop. However, you will need to add features yourself.
            </div>
            <EmpButton onClick={this.props.onUpdate.bind(this, { shop: {
              unlocked: true,
              advancements: this.props.shop.advancements + 15
            }})}>
              Unlock Full Shop
            </EmpButton>
          </div>
        }
      </>
    )
  }
}

export default CharacterSheetShop
