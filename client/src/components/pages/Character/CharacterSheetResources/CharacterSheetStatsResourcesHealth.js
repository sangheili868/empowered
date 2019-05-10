import React, { Component } from 'react'
import hitPointsIcon from "../../../../icons/heart.png"
import woundIcon from "../../../../icons/skull.png"
import { dying } from "./CharacterSheetResources.module.scss"
import EmpCard from '../../../EmpCard/EmpCard';
import EmpButton from '../../../EmpButton/EmpButton';
import CharacterSheetResource from './CharacterSheetResource'

class CharacterSheetStatsHealth extends Component {

  state = {
    lastDamage: 0
  }

  handleHitPointsUpdate = (newHitPoints, damage) => {
    const remainingHealth = this.props.maxHP * (this.props.maxWounds - this.props.wounds - 1)
    const numWounds = Math.floor((-1 * newHitPoints) / this.props.maxHP) + 1
    const limitedHitPoints = Math.min(newHitPoints, this.props.maxOverheal || this.props.maxHP)
    let updateHitPoints = { path: 'stats.hitPoints', value: limitedHitPoints }
    let updateWounds = []

    if (newHitPoints <= -1 * remainingHealth) {
      this.setState({ lastDamage: -1 * damage })
      updateHitPoints = { path: 'stats.hitPoints', value: 1 }
      updateWounds = [{ path: 'stats.wounds', value: this.props.maxWounds }]
    }
    else if (newHitPoints <= 0) {
      updateHitPoints = { path: 'stats.hitPoints', value: newHitPoints + (this.props.maxHP * numWounds) }
      updateWounds = [{ path: 'stats.wounds', value: this.props.wounds + numWounds } ]
    }

    this.props.updateCharacter([
      updateHitPoints,
      ...updateWounds
    ])
  }

  handleWoundsUpdate = (newWounds) => {
    const updateWounds = { path: 'stats.wounds', value: newWounds }
    const isOverHPMax = newWounds <= 0 && this.props.hitPoints > this.props.maxHP
    const updateHitPoints = isOverHPMax ? [{ path: 'stats.hitPoints', value: this.props.maxHP}] : []
    this.props.updateCharacter([
      updateWounds,
      ...updateHitPoints
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
              Roll willpower against the damage taken{this.state.lastDamage > 0 && ` (${this.state.lastDamage})`}.
              If you succeed, click "Recover". Otherwise, you die.
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
              isInputModal
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
              onUpdate={this.handleWoundsUpdate}
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
