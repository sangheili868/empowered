import React, { Component } from 'react'
import {
  resources,
  resource,
  title,
  info,
  icon,
  valueRow,
  spacer,
  subtext
} from "./CharacterPage.module.scss"
import { startCase } from 'lodash'
import hitPointsIcon from "../../../icons/heart.png"
import armorIcon from "../../../icons/soldier.png"
import shieldIcon from "../../../icons/shield.png"
import woundIcon from "../../../icons/bandage.png"
import tempHPIcon from "../../../icons/circle-plus.png"
import speedIcon from "../../../icons/boot.png"
import restIcon from "../../../icons/campfire.png"
import downtimeIcon from "../../../icons/inn.png"
import CharacterSheetResource from './CharacterSheetResource'
import { chain, mapValues } from 'lodash'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import CharacterSheetStatsRecovery from './CharacterSheetStatsRecovery';

class CharacterSheetStatsResources extends Component {
  render () {
    return (
      <div>
        <div className={resources}>
          <CharacterSheetResource
            title="Hit Points"
            value={this.props.stats.hitPoints}
            onUpdate={(value) => this.props.onUpdate({stats: { hitPoints: value}})}
            alt="Hit Points Icon"
            icon={hitPointsIcon}
            max={this.props.stats.maxHP}
          />
          <CharacterSheetResource
            title="Wounds"
            value={this.props.stats.wounds}
            onUpdate={(value) => this.props.onUpdate({stats: { wounds: value}})}
            alt="Wound Icon"
            icon={woundIcon}
            max={this.props.stats.maxWounds}
          />
          <CharacterSheetResource
            title="Temp. HP"
            value={this.props.stats.tempHP}
            onUpdate={(value) => this.props.onUpdate({stats: { tempHP: value}})}
            alt="Temp. HP Icon"
            icon={tempHPIcon}
            max={this.props.stats.maxTempHP}
          />
          <div className={resource}>
            <div className={title}>Armor</div>
            <div className={info}>
              <img className={icon} alt="Armor Icon" src={armorIcon}/>
              <div className={valueRow}>
                <div className={spacer}></div>
                <div>{this.props.stats.armor.rating}</div>
                <EmpItemEditor
                  title="Armor"
                  isEdit
                  fields={{
                    rating: this.props.stats.armor.rating,
                    type: this.props.stats.armor.type
                  }}
                  onUpdate={values => this.props.onUpdate({
                    stats: {
                      armor: values
                    }
                  })}
                />
              </div>
              <div className={subtext}>{startCase(this.props.stats.armor.type)}</div>
            </div>
          </div>
          <div className={resource}>
            <div className={title}>Shield</div>
            <div className={info}>
              <img className={icon} alt="Shield Icon" src={shieldIcon}/>
              <div className={valueRow}>
                <div className={spacer}></div>
                <div>{this.props.stats.shield.rating}</div>
                <EmpItemEditor
                  title="Shield"
                  isEdit
                  fields={{
                    rating: this.props.stats.shield.rating,
                    type: this.props.stats.shield.type
                  }}
                  onUpdate={values => this.props.onUpdate({
                    stats: {
                      shield: values
                    }
                  })}
                />
              </div>
              <div className={subtext}>{startCase(this.props.stats.shield.type)}</div>
            </div>
          </div>
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
                    rating: this.props.stats.speed.rating,
                    type: this.props.stats.speed.type
                  }}
                  onUpdate={values => this.props.onUpdate({
                    stats: {
                      speed: values
                    }
                  })}
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
                'Recover all hitpoints.',
                'Recover all power dice.',
                'Lose all temporary hit points.'
              ]}
              onConfirm={() => {
                this.props.onUpdate({ stats: {
                  hitPoints: this.props.stats.maxHP,
                  tempHP: 0,
                  powerDice: mapValues(this.props.stats.powerDice, ({max}) => ({ current: max, max }))
                }})
              }}
            />
            <CharacterSheetStatsRecovery
              title="Downtime"
              icon={downtimeIcon}
              duration="5 days"
              effects={[
                'Recover all hitpoints.',
                'Recover all power dice.',
                'Lose all temporary hit points.',
                'Heal all wounds.',
                'Spend advancements.',
                'Reject features from the shop.',
                'Perform a downtime activity.',
              ]}
              onConfirm={() => {
                this.props.onUpdate({ stats: {
                  hitPoints: this.props.stats.maxHP,
                  tempHP: 0,
                  wounds: 0,
                  powerDice: mapValues(this.props.stats.powerDice, ({max}) => ({ current: max, max }))
                }})
              }}
            />
          </div>
        </div>
        <div className={resources}>
          {chain(this.props.stats.powerDice)
            .pickBy('max')
            .map(({current, max}, dieSize) => 
              <CharacterSheetResource
                key={dieSize}
                title={'Power '+ dieSize}
                value={current}
                onUpdate={(value) =>this.props.onUpdate({stats: { powerDice: { [dieSize]: {
                  current: value
                }}}})}
                alt={dieSize}
                icon={hitPointsIcon}
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