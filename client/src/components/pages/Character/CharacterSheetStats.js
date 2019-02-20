import React, { Component } from 'react'
import "./characterSheetStats.scss"
import CharacterSheetStatsResource from "./CharacterSheetStatsResource"
import hitPointsIcon from "../../../icons/heart.png"
import armorIcon from "../../../icons/soldier.png"
import shieldIcon from "../../../icons/shield.png"
import woundIcon from "../../../icons/bandage.png"
import tempHPIcon from "../../../icons/circle-plus.png"
import speedIcon from "../../../icons/boot.png"

class CharacterSheetStats extends Component {
  fortitude = 10 + this.props.stats.abilityScores.strong +
    this.props.stats.abilityScores.determined
  render () {
    return (
      <div className="stats">
        <CharacterSheetStatsResource
          className="stat"
          title="Hit Points"
          icon={hitPointsIcon}
          value={this.props.stats.hitPoints}
          subtext={"Max: " + this.fortitude}
        />
        <CharacterSheetStatsResource
          className="stat"
          title="Temp. HP"
          icon={tempHPIcon}
          value={this.props.stats.tempHP}
          subtext={"Max: " + this.fortitude}
        />
        <CharacterSheetStatsResource
          className="stat"
          title="Wounds"
          icon={woundIcon}
          value={this.props.stats.wounds}
          subtext={"Limit: 5"}
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
        <div className="stat">
          Weapons:
          <ul style={{textAlign: "left"}}>{
            this.props.stats.weapons && 
            this.props.stats.weapons.map((weapon, index) =>
              <li key={index}>{weapon.name}</li>
            )
          }</ul>
        </div>
      </div>
    )
  }
}

export default CharacterSheetStats