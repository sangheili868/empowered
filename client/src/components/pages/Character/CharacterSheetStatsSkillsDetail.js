import React, { Component } from 'react'
import { startCase } from 'lodash'
import EmpModal from '../../EmpModal/EmpModal'

class CharacterSheetStatsSkillsDetail extends Component {
  render () {
    return this.props.skill.features.length ? (
      <EmpModal
        title={startCase(this.props.skill.name)}
        body={this.props.skill.features.map(({ name }) => name).join(', ')}
      >
        <div>{startCase(this.props.skill.name)} *</div>
        <div>{this.props.skill.value}</div>
      </EmpModal>
    ) : (
      <div>
        <div>{startCase(this.props.skill.name)}</div>
        <div>{this.props.skill.value}</div>
      </div>
    )
  }
}

export default CharacterSheetStatsSkillsDetail
