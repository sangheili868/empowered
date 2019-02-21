import React, { Component } from 'react'
import { skillsList, title, table, spacer } from "./CharacterSheetStatsSkills.module.scss"

class CharacterSheetStatsSkills extends Component {
  render () {
    return (
      <div className={skillsList}>
        <div className={title}>Skills</div>
        <br/>
        <div className={table}>
          <div>
            <div className={spacer}> </div>
            <div>Quick</div>
            <div>{this.props.abilityScores.quick}</div>
            <div>Determined</div>
            <div>{this.props.abilityScores.determined}</div>
            <div>Social</div>
            <div>{this.props.abilityScores.social}</div>
          </div>
          <div>
            <div>Strong</div>
            <div>{this.props.abilityScores.strong}</div>
            <div>Athletics</div>
            <div>{this.props.skills.athletics}</div>
            <div>Fortitude</div>
            <div>{this.props.skills.fortitude}</div>
            <div>Intimidation</div>
            <div>{this.props.skills.intimidation}</div>
            <div>Brawn</div>
            <div>{this.props.skills.brawn}</div>
          </div>
          <div>
            <div>Aware</div>
            <div>{this.props.abilityScores.aware}</div>
            <div>Stealth</div>
            <div>{this.props.skills.stealth}</div>
            <div>Investigation</div>
            <div>{this.props.skills.investigation}</div>
            <div>Insight</div>
            <div>{this.props.skills.insight}</div>
            <div>Perception</div>
            <div>{this.props.skills.perception}</div>
          </div>
          <div>
            <div>Smart</div>
            <div>{this.props.abilityScores.smart}</div>
            <div>Handiwork</div>
            <div>{this.props.skills.handiwork}</div>
            <div>Wisdom</div>
            <div>{this.props.skills.wisdom}</div>
            <div>Synergy</div>
            <div>{this.props.skills.synergy}</div>
            <div>Knowledge</div>
            <div>{this.props.skills.knowledge}</div>
          </div>
          <div>
            <div className={spacer}> </div>
            <div>Agility</div>
            <div>{this.props.skills.agility}</div>
            <div>Willpower</div>
            <div>{this.props.skills.willpower}</div>
            <div>Persuasion</div>
            <div>{this.props.skills.persuasion}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CharacterSheetStatsSkills