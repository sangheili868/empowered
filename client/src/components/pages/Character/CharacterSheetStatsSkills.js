import React, { Component } from 'react'
import { section, title, table, columnHeader } from "./CharacterPage.module.scss"
import { startCase, invert } from 'lodash'
import skills from '../../../gameData/skills.json'

class CharacterSheetStatsSkills extends Component {
  scoreNames = Object.keys(this.props.abilityScores)
  topScores = this.scoreNames.slice(0, this.scoreNames.length/2)
  leftScores = this.scoreNames.slice(this.scoreNames.length/2, this.scoreNames.length)
  render () {
    return (
      <div className={section}>
        <div className={title}>Skills</div>
        <table className={table}>
          <tr>
            <td></td>
            {this.topScores.map(topScore =>
              <td>
                <div className={columnHeader}>{startCase(topScore)}</div>
                <div>{this.props.abilityScores[topScore]}</div>
              </td>
            )}
          </tr>
          {this.leftScores.map(leftScore =>
            <tr>
            <td>
              <div className={columnHeader}>{startCase(leftScore)}</div>
              <div>{this.props.abilityScores[leftScore]}</div>
            </td>
              {this.topScores.map(topScore =>
                <td>
                  <div>{startCase(invert(skills)[[topScore, leftScore]])}</div>
                  <div>{this.props.skills[invert(skills)[[topScore, leftScore]]]}</div>
                </td>
              )}
              <td>
                <div>{startCase(invert(skills)[[leftScore, leftScore]])}</div>
                <div>{this.props.skills[invert(skills)[[leftScore, leftScore]]]}</div>
              </td>
            </tr>
          )}
          <tr>
            <td></td>
            {this.topScores.map(topScore =>
              <td>
                <div>{startCase(invert(skills)[[topScore, topScore]])}</div>
                <div>{this.props.skills[invert(skills)[[topScore, topScore]]]}</div>
              </td>
            )}
          </tr>
        </table>
      </div>
    )
  }
}

export default CharacterSheetStatsSkills