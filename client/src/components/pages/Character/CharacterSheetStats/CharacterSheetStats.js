import React, { Component } from 'react'
import { sheetPage, detailTitle } from '../CharacterPage.module.scss'
import CharacterSheetStatsResources from "../CharacterSheetResources/CharacterSheetStatsResources"
import CharacterSheetSkills from "../CharacterSheetTable/CharacterSheetSkills"
import CharacterSheetList from '../CharacterSheetList/CharacterSheetList'
import CharacterSheetTable from '../CharacterSheetTable/CharacterSheetTable'
import { pick } from 'lodash'
import featureFields from '../../../../gameData/featureFields'
import CharacterSheetStatsWeapons from './CharacterSheetStatsWeapons'
import CharacterSheetStatsEquipment from './CharacterSheetStatsEquipment'
import CharacterSheetStatsProficiencies from './CharacterSheetStatsProficiencies'

class CharacterSheetStats extends Component {
  renderTooltipBody = item =>
  {
    const hasFeatures = item.features && item.features.length > 0
    const features = hasFeatures && item.features.map(({ name }) => name).join(', ')
    return (
      <>
        <div>{item.description}</div>
        {hasFeatures &&
          <>
            <div className={detailTitle}>Features Related to {item.name}</div>
            <div>{features}</div>
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
          <CharacterSheetSkills {...pick(this.props.stats, ['abilityScores', 'skills'])}/>
          <CharacterSheetStatsWeapons
            {...pick(this.props.stats, ['weapons', 'availableWeapons'])}
            currentWeapons={this.props.stats.base.weapons}
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
              mode: item => item.mode || '',
              title: item => item.name,
              body: this.renderTooltipBody
            }}
          />
          <CharacterSheetTable
            title="Features"
            items={this.props.stats.features}
            columnNames={{ name: 'Name', description: 'Description' }}
            fields={featureFields}
            onEdit={(index, values) => this.props.updateCharacter(['stats', 'features', index], values)}
          />
        </div>
      </div>
    )
  }
}

export default CharacterSheetStats