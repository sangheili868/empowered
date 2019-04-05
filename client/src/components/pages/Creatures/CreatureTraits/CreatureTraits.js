import React, { Component } from 'react'
import { title, box } from './CreatureTraits.module.scss'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import CreatureCounter from './CreatureCounter'
import CreatureSkills from './CreatureSkills'
import { pick } from 'lodash'

class CreatureTraits extends Component {

  handleUpdate = (path, newValue) => {
    this.props.updateCreature(`stats.${path}`, newValue)
  }

  dropdownOptions (data) {
    return data.map(({ displayName, category }) => ({ label: displayName, value: category }))
  }

  render () {
    return (
      <>
        <CreatureCounter
          title="Stats"
          fields={pick(this.props.stats, [
            'woundLimit',
            'powerPoints',
            'armor',
            'shield'
          ])}
          computedFields={{
            hitPoints: this.props.stats.maxHitPoints,
            evasion: this.props.stats.skills.agility.value
          }}
          basePath={'stats'}
          updateCreature={this.props.updateCreature}
        />

        <div className={box}>
          <div className={title}>Speed</div>
          <EmpItemEditor
            title="Edit Speed"
            fields={{
              rating: {
                value: this.props.stats.speed.rating
              },
              type: {
                value: this.props.stats.speed.type
              }
            }}
            onSave={this.handleUpdate.bind(this, 'speed')}
          >
            {this.props.stats.speed.rating}ft. {this.props.stats.speed.type}
          </EmpItemEditor>
          <div/>
        </div>

        <CreatureCounter
          title="Ability Scores"
          fields={this.props.stats.abilityScores}
          basePath={'stats.abilityScores'}
          updateCreature={this.props.updateCreature}
        />

        <CreatureSkills abilityScores={this.props.stats.abilityScores} skills={this.props.stats.skills}/>
      </>
    )
  }
}

export default CreatureTraits
