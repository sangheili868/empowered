import React, { Component } from 'react'
import { table, borderless, columnHeader } from "./CharacterPage.module.scss"
import { startCase, keyBy } from 'lodash'
import EmpCard from '../../EmpCard/EmpCard'
import skills from '../../../gameData/skills.json'

class CharacterSheetStatsSkills extends Component {
  scoreNames = Object.keys(this.props.abilityScores)
  topScores = this.scoreNames.slice(0, this.scoreNames.length/2)
  leftScores = this.scoreNames.slice(this.scoreNames.length/2, this.scoreNames.length)
  render () {
    const skillsByAbility = keyBy(skills, 'abilityScores')
    return (
      <EmpCard isStartingOpen title="Skills">
        <table className={[table, borderless].join(' ')}>
          <tbody>
            <tr>
              <td></td>
              {this.topScores.map(topScore =>
                <td key={topScore}>
                  <div className={columnHeader}>{startCase(topScore)}</div>
                  <div>{this.props.abilityScores[topScore]}</div>
                </td>
              )}
            </tr>
            {this.leftScores.map(leftScore =>
              <tr key={leftScore}>
                <td>
                  <div className={columnHeader}>{startCase(leftScore)}</div>
                  <div>{this.props.abilityScores[leftScore]}</div>
                </td>
                {this.topScores.map(topScore =>
                  <td key={topScore}>
                    <div>{startCase(skillsByAbility[[topScore, leftScore]].name)}</div>
                    <div>{this.props.skills[skillsByAbility[[topScore, leftScore]].name]}</div>
                  </td>
                )}
                <td>
                  <div>{startCase(skillsByAbility[[leftScore, leftScore]].name)}</div>
                  <div>{this.props.skills[skillsByAbility[[leftScore, leftScore]].name]}</div>
                </td>
              </tr>
            )}
            <tr>
              <td></td>
              {this.topScores.map(topScore =>
                <td key={topScore}>
                  <div>{startCase(skillsByAbility[[topScore, topScore]].name)}</div>
                  <div>{this.props.skills[skillsByAbility[[topScore, topScore]].name]}</div>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </EmpCard>
    )
  }
}

export default CharacterSheetStatsSkills
