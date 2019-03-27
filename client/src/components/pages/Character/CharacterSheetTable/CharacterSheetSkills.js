import React, { Component } from 'react'
import { table, borderless, columnHeader } from "./CharacterSheetTable.module.scss"
import { startCase, keyBy } from 'lodash'
import EmpCard from '../../../EmpCard/EmpCard'
import skills from '../../../../gameData/skills.json'
import CharacterSheetSkillsDetail from './CharacterSheetSkillsDetail'

class CharacterSheetSkills extends Component {

  get topScores () {
    const scoreNames = Object.keys(this.props.abilityScores)
    return scoreNames.slice(0, scoreNames.length/2)
  }

  get leftScores () {
    const scoreNames = Object.keys(this.props.abilityScores)
    return scoreNames.slice(scoreNames.length/2, scoreNames.length)
  }

  get skillsByAbility () {
    return keyBy(skills, 'abilityScores')
  }

  getSkill (firstScore, secondScore) {
    return this.props.skills[this.skillsByAbility[[firstScore, secondScore]].name]
  }

  render () {
    return (
      <EmpCard isStartingOpen title="Skills">
        <table className={[table, borderless].join(' ')}>
          <tbody>
            <tr>
              <td></td>
              {this.topScores.map(topScore =>
                <td key={topScore}>
                  <div className={columnHeader}>{startCase(topScore)}</div>
                  <div>{this.props.abilityScores[topScore].displayValue}</div>
                </td>
              )}
            </tr>
            {this.leftScores.map(leftScore =>
              <tr key={leftScore}>
                <td>
                  <div className={columnHeader}>{startCase(leftScore)}</div>
                  <div>{this.props.abilityScores[leftScore].displayValue}</div>
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
