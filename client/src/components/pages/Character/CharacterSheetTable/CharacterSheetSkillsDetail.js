import React, { Component } from 'react'
import { startCase } from 'lodash'
import EmpModal from '../../../EmpModal/EmpModal'
import { borderlessCell } from './CharacterSheetTable.module.scss'
import { detailTitle } from '../CharacterPage.module.scss'

class CharacterSheetSkillsDetail extends Component {
  get skillName () {
    return startCase(this.props.skill.name)
  }

  get hasFeatures () {
    return this.props.skill.features && this.props.skill.features.length > 0
  }

  get hasModifiers () {
    return this.props.skill.modifiers
  }

  get features () {
    return this.props.skill.features.map(({ name }) => name).join(', ')
  }

  get title () {
    return this.props.skill.displayValue ? this.skillName+': '+this.props.skill.displayValue : this.skillName
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
          {this.hasModifiers &&
            <>
              <div className={detailTitle}>Modifiers to {this.skillName}</div>
              <div>{this.props.skill.modifiers}</div>
            </>
          }
        </>
      } className={borderlessCell}>
        <div>{this.skillName}</div>
        <div>{this.props.skill.displayValue}</div>
      </EmpModal>
    )
  }
}

export default CharacterSheetSkillsDetail
