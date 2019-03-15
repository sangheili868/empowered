import React, { Component } from 'react'
import {
  resources,
  resource,
  title,
  info,
  icon,
  valueRow,
  spacer,
  detailTitle,
  subtext
} from "./CharacterPage.module.scss"
import CharacterSheetResource from './CharacterSheetResource'
import { chain, mapValues, startCase } from 'lodash'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import CharacterSheetStatsRecovery from './CharacterSheetStatsRecovery';
import hitPointsIcon from "../../../icons/heart.png"
import armorIcon from "../../../icons/soldier.png"
import shieldIcon from "../../../icons/shield.png"
import woundIcon from "../../../icons/bandage.png"
import tempHPIcon from "../../../icons/circle-plus.png"
import speedIcon from "../../../icons/boot.png"
import restIcon from "../../../icons/campfire.png"
import downtimeIcon from "../../../icons/inn.png"
import d4Icon from "../../../icons/d4.png"
import d6Icon from "../../../icons/d6.png"
import d8Icon from "../../../icons/d8.png"
import d10Icon from "../../../icons/d10.png"
import d12Icon from "../../../icons/d12.png"
import CharacterSheetStatsList from './CharacterSheetStatsList'
import conditionData from '../../../gameData/conditions.json'
import armorData from '../../../gameData/armor.json'
import shieldData from '../../../gameData/shields.json'
import equipmentProficiencyData from '../../../gameData/equipmentProficiencies.json'
import withoutIndex from '../../../utils/withoutIndex'

class CharacterSheetStatsResources extends Component {
  diceIcons = {
    'd4s': d4Icon,
    'd6s': d6Icon,
    'd8s': d8Icon,
    'd10s': d10Icon,
    'd12s': d12Icon,
  }
  render () {
    return (
      <div>
        <div className={resources}>
          <CharacterSheetResource
            title="Hit Points"
            value={this.props.stats.hitPoints}
            onUpdate={(value) => this.props.setCharacter('stats.hitPoints', value)}
            alt="Hit Points Icon"
            icon={hitPointsIcon}
            max={this.props.stats.maxHP}
          />
          <CharacterSheetResource
            title="Wounds"
            value={this.props.stats.wounds}
            onUpdate={(value) => this.props.setCharacter('stats.wounds', value)}
            alt="Wound Icon"
            icon={woundIcon}
            max={this.props.stats.maxWounds}
          />
          <CharacterSheetResource
            title="Temp. HP"
            value={this.props.stats.tempHP}
            onUpdate={(value) => this.props.setCharacter('stats.tempHP', value)}
            alt="Temp. HP Icon"
            icon={tempHPIcon}
            max={this.props.stats.maxTempHP}
          />
          {[
            { resourceName: 'armor', resourceIcon: armorIcon, categories: armorData },
            { resourceName: 'shield', resourceIcon: shieldIcon, categories: shieldData }
          ].map(({resourceName, resourceIcon, categories}) => this.props.stats[resourceName].options.length > 1 &&
            <div className={resource} key={resourceName}>
              <div className={title}>{startCase(resourceName)}</div>
              <div className={info}>
                <img className={icon} alt={startCase(resourceName) + ' Icon'} src={resourceIcon}/>
                <div className={valueRow}>
                  <div className={spacer}></div>
                  <div>{this.props.stats[resourceName].category === 'none' ? '' : this.props.stats[resourceName].rating}</div>
                  <EmpItemEditor
                    title={startCase(resourceName)}
                    isEdit
                    fields={{
                      name: this.props.stats[resourceName].name,
                      category: {
                        value: this.props.stats[resourceName].category,
                        default: 'none',
                        options: this.props.stats[resourceName].options
                      }

                    }}
                    description={({category}) => {
                      if (category && category.value && !Array.isArray(category.value)) {
                        const catData = categories.find(cat => cat.category === category.value)
                        return (catData.proficiency !== 'none') ? equipmentProficiencyData[catData.proficiency].description : ''
                      }
                    }}
                    onUpdate={values => this.props.setCharacter(['stats', resourceName], values)}
                  />
                </div>
                <div className={subtext}>{this.props.stats[resourceName].name}</div>
              </div>
            </div>
          )}
          <div className={resource}>
            <div className={title}>Speed</div>
            <div className={info}>
              <img className={icon} alt="Speed Icon" src={speedIcon}/>
              <div className={valueRow}>
                <div className={spacer}></div>
                <div>{this.props.stats.speed.rating}ft.</div>
                <EmpItemEditor
                  title="Speed"
                  isEdit
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
                  onUpdate={({ baseValue, type }) => this.props.setCharacter([
                    { path: 'stats.speed.baseValue', value: parseInt(baseValue) },
                    { path: 'stats.speed.type', value: type}
                  ])}
                />
              </div>
              <div className={subtext}>{this.props.stats.speed.type}</div>
            </div>
          </div>
          <div className={resource}>
            <div className={title}>Recovery</div>
            <CharacterSheetStatsRecovery
              title="Rest"
              icon={restIcon}
              duration="8 hours"
              effects={[
                'Recover all hit points.',
                'Recover all power dice.',
                'Lose all temporary hit points.'
              ]}
              onConfirm={this.props.setCharacter.bind(this, [
                  { path: 'stats.hitPoints', value: this.props.stats.maxHP },
                  { path: 'stats.tempHP', value: 0 },
                  { path: 'stats.powerDice', value: mapValues(this.props.stats.powerDice, ({max}) => ({ current: max, max })) },
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
                'Lose all temporary hit points.',
                'Heal all wounds.',
                'Spend advancements.',
                'Reject features from the shop.',
                'Perform a downtime activity.',
              ]}
              onConfirm={this.props.setCharacter.bind(this, [
                  { path: 'stats.hitPoints', value: this.props.stats.maxHP },
                  { path: 'stats.wounds', value: 0 },
                  { path: 'stats.tempHP', value: 0 },
                  { path: 'stats.powerDice', value: mapValues(this.props.stats.powerDice, ({max}) => ({ current: max, max })) },
                ])
              }
            />
          </div>
          <CharacterSheetStatsList
            title="Conditions"
            items={this.props.stats.conditions}
            editItem={(item, index) =>
              <EmpItemEditor
                key={index}
                isInline
                title={item.name}
                onDelete={this.props.setCharacter.bind(this, 'stats.conditions', withoutIndex(this.props.stats.conditions, index))}
                description={item.description}
              >
                {item.name}
              </EmpItemEditor>
            }
            addToList={() => {
              const notActiveConditions = Object.keys(conditionData)
                .filter(condition => !chain(this.props.stats.conditions)
                  .reject('deleted')
                  .map('name')
                  .includes(condition)
                  .value()
                )
                .map(condition => ({ label: condition, value: condition}))
              return (notActiveConditions.length > 0) && (
                <EmpItemEditor
                  title={'Add a Condition'}
                  fields={{ name: {
                    value: '',
                    default: '',
                    options: notActiveConditions
                  }}}
                  description={({ name }) => name && name.value && conditionData[name.value].description}
                  onUpdate={values => this.props.setCharacter('stats.conditions', [
                    ...this.props.stats.conditions,
                    values
                  ])}
                />
              )
            }}
          />
        </div>
        <div className={resources}>
          {chain(this.props.stats.powerDice)
            .pickBy('max')
            .map(({current, max}, dieSize) =>
              <CharacterSheetResource
                key={dieSize}
                title={'Power '+ dieSize}
                value={current}
                onUpdate={value => this.props.setCharacter(['stats', 'powerDice', dieSize, 'current'], value)}
                alt={dieSize}
                icon={this.diceIcons[dieSize]}
                max={max}
              />
            )
            .value()
          }
        </div>
      </div>
    )
  }
}

export default CharacterSheetStatsResources
