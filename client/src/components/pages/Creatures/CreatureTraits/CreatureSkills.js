import React, { Component } from 'react'
import { startCase, keyBy } from 'lodash'
import skills from '../../../../gameData/skills.json'
import { box, title, smallFields } from './CreatureTraits.module.scss'

class CreatureSkills extends Component {

  get scoreNames () {
    return Object.keys(this.props.abilityScores)
  }

  get topScores () {
    return this.scoreNames.slice(0, this.scoreNames.length/2)
  }

  get leftScores () {
    return this.scoreNames.slice(this.scoreNames.length/2, this.scoreNames.length)
  }

  renderSkill = (firstScore, secondScore) => {
    const skillsByAbility = keyBy(skills, 'abilityScores')
    const skillName = skillsByAbility[[firstScore, secondScore]].name
    return (
      <>
        <div>{startCase(skillName)}</div>
        <div>{this.props.skills[skillName].displayValue}</div>
      </>
    )
  }

  render () {
    return (
      <div className={box}>
        <div className={title}>Skills</div>
        <table>
          <tbody>
            {this.leftScores.map(leftScore =>
              <tr key={leftScore}>
                {this.topScores.map(topScore =>
                  <td key={topScore} className={smallFields}>{this.renderSkill(topScore, leftScore)}</td>
                )}
                <td className={smallFields}>{this.renderSkill(leftScore, leftScore)}</td>
              </tr>
            )}
            <tr>
              {this.topScores.map(topScore =>
                <td key={topScore} className={smallFields}>{this.renderSkill(topScore, topScore)}</td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default CreatureSkills
