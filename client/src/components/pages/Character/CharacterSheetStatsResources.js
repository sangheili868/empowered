import React, { Component } from 'react'
import {
  resources,
  resource,
  title,
  info,
  icon,
  value,
  subtext
} from "./CharacterPage.module.scss"
import { startCase } from 'lodash'
import hitPointsIcon from "../../../icons/heart.png"
import armorIcon from "../../../icons/soldier.png"
import shieldIcon from "../../../icons/shield.png"
import woundIcon from "../../../icons/bandage.png"
import tempHPIcon from "../../../icons/circle-plus.png"
import speedIcon from "../../../icons/boot.png"
import CharacterSheetStatsResource from './CharacterSheetStatResource'

class CharacterSheetStatsResources extends Component {
  render () {
    return (
      <div className={resources}>
        <CharacterSheetStatsResource
          title="Hit Points"
          value={this.props.stats.hitPoints}
          onUpdate={(value) => this.props.onUpdate({stats: { hitPoints: value}})}
          alt="Hit Points Icon"
          icon={hitPointsIcon}
          max={this.props.stats.maxHP}
        />
        <CharacterSheetStatsResource
          title="Wounds"
          value={this.props.stats.wounds}
          onUpdate={(value) => this.props.onUpdate({stats: { wounds: value}})}
          alt="Wound Icon"
          icon={woundIcon}
          max={this.props.stats.maxWounds}
        />
        <CharacterSheetStatsResource
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
            <div className={value}>{this.props.stats.armor.rating}</div>
            <div className={subtext}>{startCase(this.props.stats.armor.type)}</div>
          </div>
        </div>
        <div className={resource}>
          <div className={title}>Shield Bonus</div>
          <div className={info}>
            <img className={icon} alt="Shield Icon" src={shieldIcon}/>
            <div className={value}>{this.props.stats.shield.rating}</div>
            <div className={subtext}>{startCase(this.props.stats.shield.type)}</div>
          </div>
        </div>
        <div className={resource}>
          <div className={title}>Speed</div>
          <div className={info}>
            <img className={icon} alt="Speed Icon" src={speedIcon}/>
            <div className={value}>{this.props.stats.speed.rating}ft.</div>
            <div className={subtext}>{this.props.stats.speed.type}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CharacterSheetStatsResources