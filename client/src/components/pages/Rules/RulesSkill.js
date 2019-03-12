import React, { Component } from 'react'
import skills from '../../../gameData/skills.json'
import { startCase, keyBy } from 'lodash'
import EmpModal from '../../EmpModal/EmpModal'

class RulesSkill extends Component {
  render () {
    const skill = keyBy(skills, 'abilityScores')[[this.props.firstScore, this.props.secondScore]]
    return (
      <EmpModal title={startCase(skill.name)} body={skill.description}>{startCase(skill.name)}</EmpModal>
    )
  }
}

export default RulesSkill
