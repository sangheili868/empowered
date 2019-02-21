import React, { Component } from 'react'
import "./characterSheetStats.scss"
import CharacterSheetStatsResource from "./CharacterSheetStatsResource"
import CharacterSheetStatsWeapons from "./CharacterSheetStatsWeapons"
import CharacterSheetStatsSkills from "./CharacterSheetStatsSkills"
import hitPointsIcon from "../../../icons/heart.png"
import armorIcon from "../../../icons/soldier.png"
import shieldIcon from "../../../icons/shield.png"
import woundIcon from "../../../icons/bandage.png"
import tempHPIcon from "../../../icons/circle-plus.png"
import speedIcon from "../../../icons/boot.png"

class CharacterSheetStats extends Component {
  render () {
    return (
      <div>
        <div className="stats">
          <CharacterSheetStatsResource
            className="stat"
            title="Hit Points"
            icon={hitPointsIcon}
            value={this.props.stats.hitPoints}
            subtext={"Max: " + this.props.stats.maxHP}
          />
          <CharacterSheetStatsResource
            className="stat"
            title="Temp. HP"
            icon={tempHPIcon}
            value={this.props.stats.tempHP}
            subtext={"Max: " + this.props.stats.maxTempHP}
          />
          <CharacterSheetStatsResource
            className="stat"
            title="Wounds"
            icon={woundIcon}
            value={this.props.stats.wounds}
            subtext={"Limit: " + this.props.stats.maxWounds}
          />
          <CharacterSheetStatsResource
            className="stat"
            title="Armor"
            icon={armorIcon}
            value={this.props.stats.armor.rating}
            subtext={this.props.stats.armor.type}
          />
          <CharacterSheetStatsResource
            className="stat"
            title="Shield"
            icon={shieldIcon}
            value={this.props.stats.shield.rating}
            subtext={this.props.stats.shield.type}
          />
          <CharacterSheetStatsResource
            className="stat"
            title="Speed"
            icon={speedIcon}
            value={this.props.stats.speed.rating + "ft."}
            subtext={this.props.stats.speed.type}
          />
        </div>
        <CharacterSheetStatsSkills
          abilityScores={this.props.stats.abilityScores}
          skills={this.props.stats.skills}
        />
        <CharacterSheetStatsWeapons weapons={this.props.stats.weapons}/>
      </div>
    )
  }
}

export default CharacterSheetStats