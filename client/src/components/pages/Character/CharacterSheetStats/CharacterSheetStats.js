import React, { Component } from 'react'
import { sheetPage, detailTitle } from '../CharacterPage.module.scss'
import CharacterSheetStatsResources from "../CharacterSheetResources/CharacterSheetStatsResources"
import EmpSkillTable from '../../../EmpSkillTable/EmpSkillTable'
import CharacterSheetList from '../CharacterSheetList/CharacterSheetList'
import { pick } from 'lodash'
import CharacterSheetStatsWeapons from './CharacterSheetStatsWeapons'
import CharacterSheetStatsEquipment from './CharacterSheetStatsEquipment'
import CharacterSheetStatsProficiencies from './CharacterSheetStatsProficiencies'
import CharacterSheetStatsFeatures from './CharacterSheetStatsFeatures'

class CharacterSheetStats extends Component {
  renderTooltipBody = item =>
  {
    const hasFeatures = item.features && item.features.length > 0
    const features = hasFeatures && item.features.map(({ name }) => name).join(', ')
    const hasConditions = item.conditions && item.conditions.length > 0
    const conditions = hasConditions && item.conditions.map(({ name }) => name).join(', ')
    return (
      <>
        <div>{item.description}</div>
        {hasFeatures &&
          <>
            <div className={detailTitle}>Features Related to {item.name}</div>
            <div>{features}</div>
          </>
        }

        {hasConditions &&
          <>
            <div className={detailTitle}>Conditions Affecting {item.name}</div>
            <div>{conditions}</div>
          </>
        }
      </>
    )
  }

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
          <CharacterSheetList
            title="Combat"
            items={this.props.stats.actions}
            tooltips={{
              mode: ({ mode }) => mode || '',
              title: ({ name }) => name,
              body: this.renderTooltipBody
            }}
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
