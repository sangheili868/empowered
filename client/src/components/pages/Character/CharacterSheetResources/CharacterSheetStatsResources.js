import React, { Component } from 'react'
import { resources } from '../CharacterPage.module.scss'
import { pick, chain, mapValues } from 'lodash'
import CharacterSheetStatsRecovery from './CharacterSheetStatsRecovery';
import restIcon from "../../../../icons/campfire.png"
import downtimeIcon from "../../../../icons/inn.png"
import EmpCard from '../../../EmpCard/EmpCard';
import CharacterSheetPowerDice from './CharacterSheetPowerDice'
import CharacterSheetStatsResourcesHealth from './CharacterSheetStatsResourcesHealth'
import CharacterSheetStatsResourcesTraits from './CharacterSheetStatsResourcesTraits'
import CharacterSheetStatsResourcesConditions from './CharacterSheetStatsResourcesConditions'

class CharacterSheetStatsResources extends Component {

  handleRest = () => {
    this.props.updateCharacter([
      { path: 'stats.hitPoints', value: this.props.stats.maxHP },
      { path: 'stats.powerDice', value: mapValues(this.props.stats.powerDice, ({max}) => ({ current: max, max })) },
      { path: 'stats.conditions', value: [] },
      ...(this.props.stats.wounds >= this.props.stats.maxWounds ? [
        { path: 'stats.wounds', value: this.props.stats.maxWounds - 1 }
      ] : [])
    ])
  }

  handleDowntime = () => {
    this.props.updateCharacter([
      { path: 'stats.hitPoints', value: this.props.stats.maxHP },
      { path: 'stats.wounds', value: 0 },
      { path: 'stats.powerDice', value: mapValues(this.props.stats.powerDice, ({max}) => ({ current: max, max })) },
      { path: 'stats.conditions', value: [] }
    ])
  }

  handleUpdateDice = (dieSize, value) => {
    this.props.updateCharacter(`stats.powerDice.${dieSize}.current`, value)
  }

  render () {
    return (
      <>
        <div className={resources}>
          <CharacterSheetStatsResourcesHealth
            {...pick(this.props.stats, ['hitPoints', 'maxHP', 'maxOverheal', 'wounds', 'maxWounds', 'isDying'])}
            updateCharacter={this.props.updateCharacter}
          />
          <CharacterSheetStatsResourcesTraits
            {...pick(this.props.stats, ['evasion', 'shield', 'armor', 'speed', 'loadout'])}
            updateCharacter={this.props.updateCharacter}
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
              onConfirm={this.handleRest}
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
              onConfirm={this.handleDowntime}
            />
          </EmpCard>
          <CharacterSheetStatsResourcesConditions
            conditions={this.props.stats.conditions}
            updateCharacter={this.props.updateCharacter}
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
                onUpdate={this.handleUpdateDice.bind(this, dieSize)}
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
