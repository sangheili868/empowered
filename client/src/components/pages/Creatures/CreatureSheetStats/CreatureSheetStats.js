import React, { Component } from 'react'
import CreatureTraits from './CreatureTraits'
import CreatureAbilityScores from './CreatureAbilityScores'
import CharacterSheetSkills from '../../Character/CharacterSheetTable/CharacterSheetSkills.js'
import CreatureAttacks from './CreatureAttacks'
import CreatureLoot from './CreatureLoot'
import { stats } from './CreatureSheetStats.module.scss'

class CreatureSheetStats extends Component {

  render () {
    return (
      <div className={stats}>
        <CreatureTraits stats={this.props.stats} updateCreature={this.props.updateCreature}/>
        <CreatureAbilityScores abilityScores={this.props.stats.abilityScores} updateCreature={this.props.updateCreature}/>
        <CharacterSheetSkills abilityScores={this.props.stats.abilityScores} skills={this.props.stats.skills}/>
        <CreatureAttacks attacks={this.props.stats.attacks} updateCreature={this.props.updateCreature}/>
        <CreatureLoot loot={this.props.stats.loot} updateCreature={this.props.updateCreature}/>
      </div>
    )
  }
}

export default CreatureSheetStats
