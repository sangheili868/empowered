import React, { Component } from 'react'
import CreatureTraits from './CreatureTraits'
import CreatureAbilityScores from './CreatureAbilityScores'
import CharacterSheetSkills from '../../Character/CharacterSheetTable/CharacterSheetSkills.js'
import CreatureAttacks from './CreatureAttacks'
import CreatureFeatures from './CreatureFeatures'
import CreatureLoot from './CreatureLoot'
import EmpModal from '../../../EmpModal/EmpModal'
import { stats, deleteButton } from './CreatureSheetStats.module.scss'

class CreatureSheetStats extends Component {

  render () {
    return (
      <>
        <div className={stats}>
          <CreatureTraits stats={this.props.stats} updateCreature={this.props.updateCreature}/>
          <CreatureAbilityScores abilityScores={this.props.stats.abilityScores} updateCreature={this.props.updateCreature}/>
          <CharacterSheetSkills abilityScores={this.props.stats.abilityScores} skills={this.props.stats.skills}/>
          <CreatureAttacks attacks={this.props.stats.attacks} updateCreature={this.props.updateCreature}/>
          <CreatureFeatures features={this.props.stats.features} updateCreature={this.props.updateCreature}/>
          <CreatureLoot loot={this.props.stats.loot} updateCreature={this.props.updateCreature}/>

        </div>
        {this.props._id &&
          <EmpModal
            title="Delete Creature"
            body="Are you sure you want to delete this creature?"
            closeText="Cancel"
            controls={[{
              label: 'Delete',
              mode: 'warning',
              onClick: this.props.onDelete
            }]}
            className={deleteButton}
            mode="warning"
          >
            Delete Creature
          </EmpModal>
        }
      </>
    )
  }
}

export default CreatureSheetStats
