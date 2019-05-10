import React, { Component } from 'react'
import { sheetPage } from '../CharacterPage.module.scss'
import CharacterSheetStatsResources from "../CharacterSheetResources/CharacterSheetStatsResources"
import EmpSkillTable from '../../../EmpSkillTable/EmpSkillTable'
import { pick } from 'lodash'
import CharacterSheetStatsWeapons from './CharacterSheetStatsWeapons'
import CharacterSheetStatsEquipment from './CharacterSheetStatsEquipment'
import CharacterSheetStatsProficiencies from './CharacterSheetStatsProficiencies'
import CharacterSheetStatsFeatures from './CharacterSheetStatsFeatures'
import CharacterSheetStatsCombat from './CharacterSheetStatsCombat'

class CharacterSheetStats extends Component {
  render () {
    return (
      <div>
        <CharacterSheetStatsResources stats={this.props.stats} updateCharacter={this.props.updateCharacter}/>
        <div className={sheetPage}>
          <EmpSkillTable {...pick(this.props.stats, ['abilityScores', 'skills'])}/>
          <CharacterSheetStatsWeapons
            {...pick(this.props.stats, ['weapons', 'availableWeapons'])}
            currentWeapons={this.props.stats.base.weapons}
            loadout={this.props.stats.loadout}
            updateCharacter={this.props.updateCharacter}
          />
          <CharacterSheetStatsEquipment
            equipment={this.props.stats.equipment}
            currentEquipment={this.props.stats.base.equipment}
            updateCharacter={this.props.updateCharacter}
          />
          <CharacterSheetStatsProficiencies
            proficiencies={this.props.stats.proficiencies}
            updateCharacter={this.props.updateCharacter}
          />
          <CharacterSheetStatsCombat
            actions={this.props.stats.actions}
            updateCharacter={this.props.updateCharacter}
          />
          <CharacterSheetStatsFeatures
            features={this.props.stats.features}
            updateCharacter={this.props.updateCharacter}
          />
        </div>
      </div>
    )
  }
}

export default CharacterSheetStats
