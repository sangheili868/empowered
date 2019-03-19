import React, { Component } from 'react'
import { resources, detailTitle, plus } from "./CharacterPage.module.scss"
import CharacterSheetResource from './CharacterSheetResource'
import { chain, mapValues } from 'lodash'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import CharacterSheetStatsRecovery from './CharacterSheetStatsRecovery';
import hitPointsIcon from "../../../icons/heart.png"
import armorIcon from "../../../icons/soldier.png"
import shieldIcon from "../../../icons/shield.png"
import woundIcon from "../../../icons/bandage.png"
import tempHPIcon from "../../../icons/circle-plus.png"
import speedIcon from "../../../icons/feet.png"
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EmpCard from '../../EmpCard/EmpCard';
import CharacterSheetTrait from './CharacterSheetTrait'

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
            max={this.props.stats.maxHP}
            icon={hitPointsIcon}
            onUpdate={value => this.props.updateCharacter('stats.hitPoints', value)}
          />
          <CharacterSheetResource
            title="Wounds"
            value={this.props.stats.wounds}
            max={this.props.stats.maxWounds}
            icon={woundIcon}
            onUpdate={value => this.props.updateCharacter('stats.wounds', value)}
          />
          <CharacterSheetResource
            title="Temp. HP"
            value={this.props.stats.tempHP}
            max={this.props.stats.maxTempHP}
            icon={tempHPIcon}
            onUpdate={value => this.props.updateCharacter('stats.tempHP', value)}
          />
          {this.props.stats.armor.options.length > 1 &&
            <CharacterSheetTrait
              trait="armor"
              value={this.props.stats.armor.rating}
              subtext={this.props.stats.armor.name}
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
          {this.props.stats.shield.options.length > 1 &&
            <CharacterSheetTrait
              trait="shield"
              value={this.props.stats.shield.rating}
              subtext={this.props.stats.shield.name}
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

          <EmpCard title="Recovery">
            <CharacterSheetStatsRecovery
              title="Rest"
              icon={restIcon}
              duration="8 hours"
              effects={[
                'Recover all hit points.',
                'Recover all power dice.',
                'Lose all temporary hit points.'
              ]}
              onConfirm={this.props.updateCharacter.bind(this, [
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
              onConfirm={this.props.updateCharacter.bind(this, [
                  { path: 'stats.hitPoints', value: this.props.stats.maxHP },
                  { path: 'stats.wounds', value: 0 },
                  { path: 'stats.tempHP', value: 0 },
                  { path: 'stats.powerDice', value: mapValues(this.props.stats.powerDice, ({max}) => ({ current: max, max })) },
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
              <CharacterSheetResource
                key={dieSize}
                title={'Power '+ dieSize}
                value={current}
                icon={this.diceIcons[dieSize]}
                max={max}
                onUpdate={value => this.props.updateCharacter(['stats', 'powerDice', dieSize, 'current'], value)}
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
