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

class CharacterSheetStatsResource extends Component {
  render () {
    return (
      <div className={resources}>
        <div className={resource}>
          <div className={title}>Hit Points</div>
          <div className={info}>
            <img className={icon} alt="Hit Points Icon" src={hitPointsIcon}/>
            <div className={value}>{this.props.stats.hitPoints}</div>
            <div className={subtext}>Max: {this.props.stats.maxHP}</div>
          </div>
        </div>
        <div className={resource}>
          <div className={title}>Wounds</div>
          <div className={info}>
            <img className={icon} alt="Wound Icon" src={woundIcon}/>
            <div className={value}>{this.props.stats.wounds}</div>
            <div className={subtext}>Limit: {this.props.stats.maxWounds}</div>
          </div>
        </div>
        <div className={resource}>
          <div className={title}>Temp. HP</div>
          <div className={info}>
            <img className={icon} alt="Temp. HP Icon" src={tempHPIcon}/>
            <div className={value}>{this.props.stats.tempHP}</div>
            <div className={subtext}>Max: {this.props.stats.maxTempHP}</div>
          </div>
        </div>
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

export default CharacterSheetStatsResource