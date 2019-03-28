import React, { Component } from 'react'
import hitPointsIcon from "../../../../icons/heart.png"
import woundIcon from "../../../../icons/skull.png"
import { dying } from "./CharacterSheetResources.module.scss"
import EmpCard from '../../../EmpCard/EmpCard';
import EmpButton from '../../../EmpButton/EmpButton';
import CharacterSheetResource from './CharacterSheetResource'

class CharacterSheetStatsHealth extends Component {

  handleHitPointsUpdate = value => {
    let woundUpdate = []
    if (value <= 0) {
      value += this.props.maxHP
      woundUpdate = [{ path: 'stats.wounds', value: this.props.wounds + 1 }]
    }
    this.props.updateCharacter([
      { path: 'stats.hitPoints', value },
      ...woundUpdate
    ])
  }

  handleHitPointsSetMax = () => {
    this.props.updateCharacter('stats.hitPoints', this.props.maxHP)
  }

  handleHitPointsSetMaxOverheal = () => {
    this.props.updateCharacter('stats.hitPoints', this.props.maxOverheal)
  }

  get renderHitPointsSubtext () {
    return (
      <>
        <EmpButton onClick={this.handleHitPointsSetMax}>Max: {this.props.maxHP}</EmpButton>
        {this.props.maxOverheal > 0 &&
          <EmpButton onClick={this.handleHitPointsSetMaxOverheal}>Overheal: {this.props.maxOverheal}</EmpButton>
        }
      </>
    )
  }

  render () {
    return (
      <>
        {this.props.isDying ? (
          <EmpCard title="DYING" mode="warning" isStartingOpen>
            <div className={dying}>
              Roll willpower. If you roll 10 or higher, click "Recover". Otherwise, you die.
              <EmpButton mode="success" onClick={this.props.updateCharacter.bind(this, [
                { path: 'stats.hitPoints', value: 1 },
                { path: 'stats.wounds', value: this.props.maxWounds - 1 }
              ])}>
                Recover
              </EmpButton>
            </div>
          </EmpCard>
        ) : (
          <>
            <CharacterSheetResource
              title="Hit Points"
              value={this.props.hitPoints}
              max={this.props.maxOverheal || this.props.maxHP}
              isAlwaysShowingMinus
              icon={hitPointsIcon}
              onUpdate={this.handleHitPointsUpdate}
            >
              {this.renderHitPointsSubtext}
            </CharacterSheetResource>
            <CharacterSheetResource
              title="Wounds"
              value={this.props.wounds}
              max={this.props.maxWounds}
              icon={woundIcon}
              isInvertingControls
              onUpdate={value => this.props.updateCharacter('stats.wounds', value)}
            >
              Death Roll At: {this.props.maxWounds}
            </CharacterSheetResource>
          </>
        )}
      </>
    )
  }
}

export default CharacterSheetStatsHealth
