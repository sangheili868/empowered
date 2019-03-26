import React, { Component } from 'react'
import { table, borderless, columnHeader } from "./CharacterSheetTable.module.scss"
import { startCase, keyBy } from 'lodash'
import EmpCard from '../../../EmpCard/EmpCard'
import skills from '../../../../gameData/skills.json'
import CharacterSheetSkillsDetail from './CharacterSheetSkillsDetail'

class CharacterSheetSkills extends Component {
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
                  <td key={topScore}>
                    <CharacterSheetSkillsDetail
                      skill={this.props.skills[skillsByAbility[[topScore, leftScore]].name]}
                    />
                  </td>
                )}
                <td>
                  <CharacterSheetSkillsDetail
                    skill={this.props.skills[skillsByAbility[[leftScore, leftScore]].name]}
                  />
                </td>
              </tr>
            )}
            <tr>
              <td></td>
              {this.topScores.map(topScore =>
                <td key={topScore}>
                  <CharacterSheetSkillsDetail
                    skill={this.props.skills[skillsByAbility[[topScore, topScore]].name]}
                  />
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </EmpCard>
    )
  }
}

export default CharacterSheetSkills
