import React, { Component } from 'react'
import { section, title, table, column, data, spacer } from "./CharacterPage.module.scss"

class CharacterSheetStatsSkills extends Component {
  render () {
    return (
      <div className={section}>
        <div className={title}>Skills</div>
        <br/>
        <div className={table}>
          <div className={column}>
            <div className={spacer}> </div>
            <div className={data}>Quick</div>
            <div className={data}>{this.props.abilityScores.quick}</div>
            <div className={data}>Determined</div>
            <div className={data}>{this.props.abilityScores.determined}</div>
            <div className={data}>Social</div>
            <div className={data}>{this.props.abilityScores.social}</div>
          </div>
          <div className={column}>
            <div className={data}>Strong</div>
            <div className={data}>{this.props.abilityScores.strong}</div>
            <div className={data}>Athletics</div>
            <div className={data}>{this.props.skills.athletics}</div>
            <div className={data}>Fortitude</div>
            <div className={data}>{this.props.skills.fortitude}</div>
            <div className={data}>Intimidation</div>
            <div className={data}>{this.props.skills.intimidation}</div>
            <div className={data}>Brawn</div>
            <div className={data}>{this.props.skills.brawn}</div>
          </div>
          <div className={column}>
            <div className={data}>Aware</div>
            <div className={data}>{this.props.abilityScores.aware}</div>
            <div className={data}>Stealth</div>
            <div className={data}>{this.props.skills.stealth}</div>
            <div className={data}>Investigation</div>
            <div className={data}>{this.props.skills.investigation}</div>
            <div className={data}>Insight</div>
            <div className={data}>{this.props.skills.insight}</div>
            <div className={data}>Perception</div>
            <div className={data}>{this.props.skills.perception}</div>
          </div>
          <div className={column}>
            <div className={data}>Smart</div>
            <div className={data}>{this.props.abilityScores.smart}</div>
            <div className={data}>Handiwork</div>
            <div className={data}>{this.props.skills.handiwork}</div>
            <div className={data}>Wisdom</div>
            <div className={data}>{this.props.skills.wisdom}</div>
            <div className={data}>Synergy</div>
            <div className={data}>{this.props.skills.synergy}</div>
            <div className={data}>Knowledge</div>
            <div className={data}>{this.props.skills.knowledge}</div>
          </div>
          <div className={column}>
            <div className={spacer}> </div>
            <div className={data}>Agility</div>
            <div className={data}>{this.props.skills.agility}</div>
            <div className={data}>Willpower</div>
            <div className={data}>{this.props.skills.willpower}</div>
            <div className={data}>Persuasion</div>
            <div className={data}>{this.props.skills.persuasion}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default CharacterSheetStatsSkills