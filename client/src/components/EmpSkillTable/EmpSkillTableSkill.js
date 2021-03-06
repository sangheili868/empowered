import React, { Component } from 'react'
import { startCase } from 'lodash'
import EmpModal from '../EmpModal/EmpModal'
import { detailTitle, cell } from './EmpSkillTable.module.scss'

class EmpSkillTableSkill extends Component {
  get skillName () {
    return startCase(this.props.skill.name)
  }

  get hasFeatures () {
    return this.props.skill.features && this.props.skill.features.length > 0
  }

  get hasModifiers () {
    return this.props.skill.modifiers
  }

  get hasConditions () {
    return this.props.skill.conditions && this.props.skill.conditions.length > 0
  }

  get features () {
    return this.props.skill.features.map(({ name }) => name).join(', ')
  }

  get conditions () {
    return this.props.skill.conditions.map(({ name }) => name).join(', ')
  }

  get title () {
    return this.props.skill.displayValue ? this.skillName+': '+this.props.skill.displayValue : this.skillName
  }

  get skillValue () {
    return this.props.isPassive ? this.props.skill.passive : this.props.skill.displayValue
  }

  render () {
    return (
      <EmpModal title={this.title} mode={this.props.skill.mode} body={
        <>
          <div>{this.props.skill.description}</div>
          {this.hasFeatures &&
            <>
              <div className={detailTitle}>Features Related to {this.skillName}</div>
              <div>{this.features}</div>
            </>
          }
          {this.hasConditions &&
            <>
              <div className={detailTitle}>Conditions Affecting {this.skillName}</div>
              <div>{this.conditions}</div>
            </>
          }
          {this.hasModifiers &&
            <>
              <div className={detailTitle}>Modifiers to {this.skillName}</div>
              <div>{this.props.skill.modifiers}</div>
            </>
          }
        </>
      } className={cell}>
        <div>{this.skillName}</div>
        <div>{this.skillValue}</div>
      </EmpModal>
    )
  }
}

export default EmpSkillTableSkill
