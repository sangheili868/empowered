import React, { Component } from 'react'
import { dying } from "./CharacterSheetResources.module.scss"
import { plus, detailTitle, resources } from '../CharacterPage.module.scss'
import CharacterSheetResource from './CharacterSheetResource'
import { chain, mapValues } from 'lodash'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import CharacterSheetStatsRecovery from './CharacterSheetStatsRecovery';
import hitPointsIcon from "../../../../icons/heart.png"
import armorIcon from "../../../../icons/armor.png"
import shieldIcon from "../../../../icons/shield.png"
import woundIcon from "../../../../icons/skull.png"
import agilityIcon from "../../../../icons/crosshair.png"
import speedIcon from "../../../../icons/foot.png"
import restIcon from "../../../../icons/campfire.png"
import downtimeIcon from "../../../../icons/inn.png"
import CharacterSheetStatsList from '../CharacterSheetList/CharacterSheetList'
import conditionData from '../../../../gameData/conditions.json'
import armorData from '../../../../gameData/armor.json'
import shieldData from '../../../../gameData/shields.json'
import equipmentProficiencyData from '../../../../gameData/equipmentProficiencies.json'
import withoutIndex from '../../../../utils/withoutIndex'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EmpCard from '../../../EmpCard/EmpCard';
import CharacterSheetTrait from './CharacterSheetTrait'
import CharacterSheetPowerDice from './CharacterSheetPowerDice'
import EmpButton from '../../../EmpButton/EmpButton';

class CharacterSheetStatsResources extends Component {
  hpUpdaters = value => {
    let woundUpdate = []
    if (value <= 0) {
      value += this.props.stats.maxHP
      woundUpdate = [{ path: 'stats.wounds', value: this.props.stats.wounds + 1 }]
    }
    return [
      { path: 'stats.hitPoints', value },
      ...woundUpdate
    ]
  }
  render () {
    return (
      <>
        <div className={resources}>
          {this.props.stats.isKOed ? (
            <EmpCard title="DYING" mode="warning" isStartingOpen>
              <div className={dying}>
                Roll willpower. If you roll 10 or higher, click "Recover". Otherwise, you die.
                <EmpButton mode="success" onClick={this.props.updateCharacter.bind(this, [
                  { path: 'stats.hitPoints', value: 1 },
                  { path: 'stats.wounds', value: this.props.stats.maxWounds - 1 }
                ])}>
                  Recover
                </EmpButton>
              </div>
            </EmpCard>
          ) : (
            <>
              <CharacterSheetResource
                title="Hit Points"
                value={this.props.stats.hitPoints}
                max={this.props.stats.maxOverheal || this.props.stats.maxHP}
                isAlwaysShowingMinus
                icon={hitPointsIcon}
                onUpdate={value => this.props.updateCharacter(this.hpUpdaters(value))}
              >
                Max: {this.props.stats.maxHP} {this.props.stats.maxOverheal > 0 && 'Overheal: ' + this.props.stats.maxOverheal}
              </CharacterSheetResource>
              <CharacterSheetResource
                title="Wounds"
                value={this.props.stats.wounds}
                max={this.props.stats.maxWounds}
                icon={woundIcon}
                onUpdate={value => this.props.updateCharacter('stats.wounds', value)}
              >
                Death Roll At: {this.props.stats.maxWounds}
              </CharacterSheetResource>
            </>
          )}
          <CharacterSheetResource
            title="Evasion"
            value={this.props.stats.evasion}
            icon={agilityIcon}
          />
          {this.props.stats.shield.options.length > 1 &&
            <CharacterSheetTrait
              trait="shield"
              value={this.props.stats.shield.rating}
              subtext={this.props.stats.shield.name || this.props.stats.shield.displayName}
              icon={shieldIcon}
              fields={{
                name: this.props.stats.shield.name,
                category: {
                  value: this.props.stats.shield.category,
                  default: 'none',
                  options: this.props.stats.shield.options
                }
              }}
              description={({category}) => {
                if (category && category.value && !Array.isArray(category.value)) {
                  const catData = shieldData.find(cat => cat.category === category.value)
                  return (catData.proficiency !== 'none') ? equipmentProficiencyData[catData.proficiency].description : ''
                }
              }}
              onUpdate={this.props.updateCharacter}
            />
          }
          {this.props.stats.armor.options.length > 1 &&
            <CharacterSheetTrait
              trait="armor"
              value={this.props.stats.armor.rating}
              subtext={this.props.stats.armor.name || this.props.stats.armor.displayName}
              icon={armorIcon}
              fields={{
                name: this.props.stats.armor.name,
                category: {
                  value: this.props.stats.armor.category,
                  default: 'none',
                  options: this.props.stats.armor.options
                }
              }}
              description={({category}) => {
                if (category && category.value && !Array.isArray(category.value)) {
                  const catData = armorData.find(cat => cat.category === category.value)
                  return (catData.proficiency !== 'none') ? equipmentProficiencyData[catData.proficiency].description : ''
                }
              }}
              onUpdate={this.props.updateCharacter}
            />
          }
          <CharacterSheetTrait
            trait="speed"
            value={this.props.stats.speed.rating + 'ft.'}
            subtext={this.props.stats.speed.type}
            icon={speedIcon}
            fields={{
              baseValue: this.props.stats.speed.baseValue,
              type: this.props.stats.speed.type
            }}
            description={this.props.stats.speed.modifier &&
              <>
                <div className={detailTitle}>Modifiers:</div>
                <div>{this.props.stats.speed.modifier}</div>
              </>
            }
            onUpdate={(path, {baseValue, type}) => this.props.updateCharacter(path, {
              baseValue: parseInt(baseValue),
              type
            })}
          />

          <EmpCard title="Recovery" isStartingOpen>
            <CharacterSheetStatsRecovery
              title="Rest"
              icon={restIcon}
              duration="8 hours"
              effects={[
                'Recover all hit points.',
                'Recover all power dice.',
                'Lose any overhealing.',
                'All conditions end'
              ]}
              onConfirm={this.props.updateCharacter.bind(this, [
                  { path: 'stats.hitPoints', value: this.props.stats.maxHP },
                  { path: 'stats.powerDice', value: mapValues(this.props.stats.powerDice, ({max}) => ({ current: max, max })) },
                  { path: 'stats.conditions', value: [] },
                  ...(this.props.stats.wounds >= this.props.stats.maxWounds ? [
                    { path: 'stats.wounds', value: this.props.stats.maxWounds - 1 }
                  ] : [])
                ])
              }
            />
            <CharacterSheetStatsRecovery
              title="Downtime"
              icon={downtimeIcon}
              duration="5 days"
              effects={[
                'Recover all hit points.',
                'Recover all power dice.',
                'Lose any overhealing.',
                'All conditions end',
                'Heal all wounds.',
                'Spend advancements.',
                'Reject features from the shop.',
                'Perform a downtime activity.',
              ]}
              onConfirm={this.props.updateCharacter.bind(this, [
                  { path: 'stats.hitPoints', value: this.props.stats.maxHP },
                  { path: 'stats.wounds', value: 0 },
                  { path: 'stats.powerDice', value: mapValues(this.props.stats.powerDice, ({max}) => ({ current: max, max })) },
                  { path: 'stats.conditions', value: [] }
                ])
              }
            />
          </EmpCard>
          <CharacterSheetStatsList
            title="Conditions"
            items={this.props.stats.conditions}
            editItem={(item, index) =>
              <EmpItemEditor
                key={index}
                isInline
                mode="warning"
                title={item.name}
                onDelete={this.props.updateCharacter.bind(this, 'stats.conditions', withoutIndex(this.props.stats.conditions, index))}
                description={item.description}
              >
                {item.name}
              </EmpItemEditor>
            }
            addToList={() => {
              const notActiveConditions = Object.keys(conditionData)
                .filter(condition => !chain(this.props.stats.conditions).map('name').includes(condition).value())
                .map(condition => ({ label: condition, value: condition}))
              return (notActiveConditions.length > 0) && (
                <EmpItemEditor
                  title="Add a Condition"
                  fields={{ name: {
                    value: '',
                    default: '',
                    options: notActiveConditions
                  }}}
                  description={({ name }) => name && name.value && conditionData[name.value].description}
                  mode="noStyle"
                  onSave={values => this.props.updateCharacter('stats.conditions', [
                    ...this.props.stats.conditions,
                    values
                  ])}
                >
                  <FontAwesomeIcon className={plus} icon={'plus-square'}/>
                </EmpItemEditor>
              )
            }}
          />
        </div>
        <div className={resources}>
          {chain(this.props.stats.powerDice)
            .pickBy('max')
            .map(({current, max}, dieSize) =>
              <CharacterSheetPowerDice
                key={dieSize}
                value={current}
                dieSize={dieSize}
                max={max}
                onUpdate={value => this.props.updateCharacter(['stats', 'powerDice', dieSize, 'current'], value)}
              />
            )
            .value()
          }
        </div>
      </>
    )
  }
}

export default CharacterSheetStatsResources
