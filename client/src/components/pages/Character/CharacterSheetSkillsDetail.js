import React, { Component } from 'react'
import { startCase } from 'lodash'
import EmpModal from '../../EmpModal/EmpModal'
import { detailTitle, borderlessCell } from './CharacterPage.module.scss'

class CharacterSheetSkillsDetail extends Component {
  render () {
    const title = startCase(this.props.skill.name)
    const hasFeatures = this.props.skill.features.length > 0
    const hasModifiers = this.props.skill.modifiers
    return (
      <EmpModal title={title+': '+this.props.skill.displayValue} mode={this.props.skill.mode} body={
        <>
          <div>{this.props.skill.description}</div>
          {hasFeatures &&
            <>
              <div className={detailTitle}>Features Related to {title}</div>
              <div>{this.props.skill.features.map(({ name }) => name).join(', ')}</div>
            </>
          }
          {hasModifiers &&
            <>
              <div className={detailTitle}>Modifiers to {title}</div>
              <div>{this.props.skill.modifiers}</div>
            </>
          }
        </>
      } className={borderlessCell}>
        <div>{title}</div>
        <div>{this.props.skill.displayValue}</div>
      </EmpModal>
    )
  }
}

export default CharacterSheetSkillsDetail
