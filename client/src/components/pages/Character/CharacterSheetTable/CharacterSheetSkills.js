import React, { Component } from 'react'
import { table, borderless, columnHeader } from "./CharacterSheetTable.module.scss"
import { startCase, keyBy, isEmpty } from 'lodash'
import EmpCard from '../../../EmpCard/EmpCard'
import skills from '../../../../gameData/skills.json'
import CharacterSheetSkillsDetail from './CharacterSheetSkillsDetail'

class CharacterSheetSkills extends Component {

  get hasValues () {
    return !isEmpty(this.props.abilityScores)
  }

  get scoreNames () {
    return this.hasValues ? Object.keys(this.props.abilityScores) : [
      'strong',
      'aware',
      'smart',
      'quick',
      'determined',
      'social'
    ]
  }

  get topScores () {
    return this.scoreNames.slice(0, this.scoreNames.length/2)
  }

  get leftScores () {
    return this.scoreNames.slice(this.scoreNames.length/2, this.scoreNames.length)
  }

  get skillsByAbility () {
    return keyBy(skills, 'abilityScores')
  }

  getSkill (firstScore, secondScore) {
    return isEmpty(this.props.skills) ? (
      this.skillsByAbility[[firstScore, secondScore]]
    ) : (
      this.props.skills[this.skillsByAbility[[firstScore, secondScore]].name]
    )
  }

  render () {
    return (
      <EmpCard isStartingOpen title="Skills" noSpacing={this.props.noSpacing}>
        <table className={[table, borderless].join(' ')}>
          <tbody>
            <tr>
              <td></td>
              {this.topScores.map(topScore =>
                <td key={topScore}>
                  <div className={columnHeader}>{startCase(topScore)}</div>
                  {this.hasValues &&
                    <div>{this.props.abilityScores[topScore].displayValue}</div>
                  }
                </td>
              )}
            </tr>
            {this.leftScores.map(leftScore =>
              <tr key={leftScore}>
                <td>
                  <div className={columnHeader}>{startCase(leftScore)}</div>
                  {this.hasValues &&
                    <div>{this.props.abilityScores[leftScore].displayValue}</div>
                  }
                </td>
                {this.topScores.map(topScore =>
                  <td key={topScore}><CharacterSheetSkillsDetail skill={this.getSkill(topScore, leftScore)}/></td>
                )}
                <td><CharacterSheetSkillsDetail skill={this.getSkill(leftScore, leftScore)}/></td>
              </tr>
            )}
            <tr>
              <td></td>
              {this.topScores.map(topScore =>
                <td key={topScore}><CharacterSheetSkillsDetail skill={this.getSkill(topScore, topScore)}/></td>
              )}
            </tr>
          </tbody>
        </table>
      </EmpCard>
    )
  }
}

export default CharacterSheetSkills
