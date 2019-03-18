import React, { Component } from 'react'
import skills from '../../../gameData/skills.json'
import { startCase, keyBy } from 'lodash'
import EmpModal from '../../EmpModal/EmpModal'
import { skillDetail } from './RulesPage.module.scss'

class RulesSkill extends Component {
  render () {
    const skill = keyBy(skills, 'abilityScores')[[this.props.firstScore, this.props.secondScore]]
    return (
      <EmpModal title={startCase(skill.name)} body={skill.description} className={skillDetail}>
        {startCase(skill.name)}
      </EmpModal>
    )
  }
}

export default RulesSkill
