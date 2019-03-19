import React, { Component } from 'react'
import CharacterSheetTable from './CharacterSheetTable'
import {
  stats,
  resources,
  languages,
  unlockText
} from './CharacterPage.module.scss'
import CharacterSheetResource from './CharacterSheetResource'
import advancementsIcon from "../../../icons/chevron.png"
import { lowerCase, cloneDeep, map, startCase } from 'lodash'
import EmpButton from '../../EmpButton/EmpButton'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import EmpCard from '../../EmpCard/EmpCard'
import featureFields from '../../../gameData/featureFields'
import CharacterSheetSkills from "./CharacterSheetSkills"
import withoutIndex from '../../../utils/withoutIndex'

class CharacterSheetShop extends Component {
  render () {
    return (
      <>
        <div className={stats}>
          <div className={resources}>
            <CharacterSheetResource
              title="Advancements"
              value={this.props.shop.advancements}
              onUpdate={value => this.props.updateCharacter('shop.advancements', value)}
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
              displayValue: 'Current'
            }}
            buyButton={index => {
              const score = this.props.shop.abilityScores[index]
              const isIncreasingHP = ['strong', 'determined'].includes(lowerCase(score.name))
              if (!this.props.shop.unlocked && score.value > 2) {
                return 'At Maximum Starting Value'
              } else if (score.value > 4) {
                return 'At Maximum'
              } else if (score.cost > this.props.shop.advancements) {
                return `Costs ${score.cost} adv.`
              } else {
                return (
                  <EmpButton mode="success" onClick={this.props.updateCharacter.bind(this, [
                    { path: 'shop.advancements', value: this.props.shop.advancements - score.cost },
                    { path: ['stats', 'abilityScores', lowerCase(score.name)], value: score.value + 1 },
                    { path: 'stats.hitPoints', value: this.props.stats.hitPoints + (isIncreasingHP ? 1 : 0) }
                  ])}>
                    -{score.cost} Adv.
                  </EmpButton>
                )
              }
            }}
            sellButton={index => {
              const score = this.props.shop.abilityScores[index]
              const isDecreasingHP = ['strong', 'determined'].includes(lowerCase(score.name))
              return (score.value <= -2) ? 'At Minimum' : (
                <EmpButton mode="warning" onClick={this.props.updateCharacter.bind(this, [
                  { path: 'shop.advancements', value: this.props.shop.advancements + score.worth },
                  { path: ['stats', 'abilityScores', lowerCase(score.name)], value: score.value - 1 },
                  { path: 'stats.hitPoints', value: Math.max(0, this.props.stats.hitPoints + (isDecreasingHP ? -1 : 0)) }
                ])}>
                  +{score.worth} Adv.
                </EmpButton>
              )
            }}
          />
          <CharacterSheetSkills
            abilityScores={this.props.stats.abilityScores}
            skills={this.props.stats.skills}
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
                      <EmpButton mode="success" onClick={this.props.updateCharacter.bind(this, [
                        { path: 'shop.advancements', value: this.props.shop.advancements - die.cost },
                        { path: ['stats', 'powerDice', die.name + 's'], value: { current: die.current + 1, max: die.current + 1 } },
                        ...(die.name === 'd4') ? [] : [{
                          path: ['stats', 'powerDice', die.smallerDie], value: {
                              current: die.smallerDieCount - 1,
                              max: die.smallerDieCount - 1
                            }
                          }]
                      ])}>
                        -{die.cost} Adv.
                      </EmpButton>
                    )
                  }
                }}
                sellButton={index => {
                  const die = this.props.shop.powerDice[index]
                  return (die.current === 0) ? 'At Minimum' : (
                    <EmpButton mode="warning" onClick={this.props.updateCharacter.bind(this, [
                      { path: 'shop.advancements', value: this.props.shop.advancements + die.worth },
                      { path: ['stats', 'powerDice', die.name + 's'], value: { current: die.current - 1, max: die.current - 1 } },
                      ...(die.name === 'd4') ? [] :[{
                        path: ['stats', 'powerDice', die.smallerDie], value: {
                            current: die.smallerDieCount + 1,
                            max: die.smallerDieCount + 1
                          }
                        }]
                    ])}>
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
                isDeletable
                fields={featureFields}
                onEdit={(index, values) => {
                  debugger
                  return this.props.updateCharacter(['shop', 'features', index], {
                  ...values,
                  cost: parseInt(values.cost)
                })}}
                onDelete={index => this.props.updateCharacter('shop.features', withoutIndex(
                  this.props.shop.base.features,
                  index
                ))}
                onAdd={values => this.props.updateCharacter('shop.features', [
                  ...this.props.shop.base.features,
                  { ...values, cost: parseInt(values.cost) }
                ])}
                buyButton={index => {
                  const feature = cloneDeep(this.props.shop.features[index])
                  if (feature.cost > this.props.shop.advancements) {
                    return `Costs ${feature.cost} adv.`
                  } else {
                    return (
                      <EmpButton mode="success" onClick={event => {
                        event.stopPropagation()
                        return this.props.updateCharacter([
                          { path: 'shop.features', value: withoutIndex(this.props.shop.base.features, index) },
                          { path: 'shop.advancements', value: this.props.shop.advancements - feature.cost },
                          { path: 'stats.features', value: [ ...this.props.stats.base.features, feature ]}
                        ])
                      }}>
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
                    name: 'Name',
                    requirementsString: 'Requirements',
                  }}
                  tooltip={{ title: item => item.name, body: item => item.description }}
                  buyButton={index => {
                    const proficiency = proficiencies[index]
                    if (proficiency.meetingRequirementsMessage) {
                      return proficiency.meetingRequirementsMessage
                    } else if (1 > this.props.shop.advancements) {
                      return `Costs ${1} adv.`
                    } else {
                      return (
                        <EmpButton mode="success" onClick={() => this.props.updateCharacter([
                          { path: 'shop.advancements', value: this.props.shop.advancements - 1 },
                          { path: 'stats.proficiencies.equipment', value: [
                            ...this.props.stats.base.proficiencies.equipment,
                            proficiency
                          ]}
                        ])}>
                          -1 Adv.
                        </EmpButton>
                      )
                    }
                  }}
                />
              )}
              <EmpCard isStartingOpen title="Languages">
                {(this.props.stats.proficiencies.languages.length < Math.max(2, this.props.stats.skills.synergy.value)) ? (
                  <div className={languages}>
                    <div>Learn a new language:</div>
                    <EmpItemEditor
                      title="Add a Language"
                      fields={{ name: '' }}
                      mode="success"
                      onSave={language => this.props.updateCharacter('stats.proficiencies.languages', [
                        ...this.props.stats.base.proficiencies.languages,
                        language
                      ])}
                      isCustomInline
                    >
                      Free
                    </EmpItemEditor>
                  </div>
                ) : (
                  <div className={languages}>
                    You know { this.props.stats.proficiencies.languages.length } languages already.
                    Increase your smart or social to learn more.
                  </div>
                )}
              </EmpCard>
              <CharacterSheetTable
                title="Sell Back"
                items={this.props.shop.sellBack}
                columnNames={{
                  name: 'Name',
                  type: 'Type'
                }}
                sellButton={index => {
                  const item = this.props.shop.sellBack[index]
                  return (
                    <EmpButton mode="warning" onClick={item.handleDelete.bind(this, this.props.updateCharacter)}>
                      +{item.worth} Adv.
                    </EmpButton>
                  )
                }}
              >
              </CharacterSheetTable>
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
            <EmpButton onClick={this.props.updateCharacter.bind(this, [
              { path: 'shop.unlocked', value: true },
              { path: 'shop.advancements', value: this.props.shop.advancements + 15 }
            ])}>
              Unlock Full Shop
            </EmpButton>
          </div>
        }
      </>
    )
  }
}

export default CharacterSheetShop
