import React, { Component } from 'react'
import { warning, languages } from './CharacterSheetShop.module.scss'
import EmpButton from '../../../EmpButton/EmpButton'
import CharacterSheetTable from '../CharacterSheetTable/CharacterSheetTable'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import EmpCard from '../../../EmpCard/EmpCard'
import { map, startCase } from 'lodash'

class CharacterSheetShopProficiencies extends Component {

  handleBuyEquipment = (proficiency, event) => {
    event.stopPropagation()
    return this.props.updateCharacter([
      { path: 'shop.advancements', value: this.props.advancements - 1 },
      { path: 'stats.proficiencies.equipment', value: [
        ...this.props.currentProficiencies.equipment,
        proficiency
      ]}
    ])
  }

  renderBuyEquipmentButton = (proficiencies, index) => {
    const proficiency = proficiencies[index]
    if (proficiency.meetingRequirementsMessage) {
      return <div className={warning}>{proficiency.meetingRequirementsMessage}</div>
    } else if (1 > this.props.advancements) {
      return <div className={warning}>Costs 1 adv.</div>
    } else {
      return <EmpButton mode="success" onClick={this.handleBuyEquipment.bind(this, proficiency)}>-1 Adv. </EmpButton>
    }
  }

  get isAbleToLearnNewLanguage () {
    return this.props.languageCount < Math.max(2, this.props.synergy)
  }

  handleSaveNewLanguage = language => {
    return this.props.updateCharacter('stats.proficiencies.languages', [
      ...this.props.currentProficiencies.languages,
      language
    ])
  }

  render () {
    return (
      <>
        {map(this.props.proficiencies, (proficiencies, grouping) =>
          <CharacterSheetTable
            key={grouping}
            title={startCase(grouping) + ' Proficiencies'}
            items={proficiencies}
            columnNames={{ name: 'Name', requirementsString: 'Requirements', }}
            tooltip={{ title: item => item.name, body: item => item.description }}
            buyButton={this.renderBuyEquipmentButton.bind(this, proficiencies)}
          />
        )}
        <EmpCard isStartingOpen title="Languages">
          {this.isAbleToLearnNewLanguage ? (
            <div className={languages}>
              <div>Learn a new language:</div>
              <EmpItemEditor
                title="Add a Language"
                fields={{ name: '' }}
                mode="success"
                onSave={this.handleSaveNewLanguage}
                isCustomInline
              >
                Free
              </EmpItemEditor>
            </div>
          ) : (
            <div className={languages}>
              You know { this.props.languageCount } languages already.
              Increase your smart or social to learn more.
            </div>
          )}
        </EmpCard>
      </>
    )
  }
}

export default CharacterSheetShopProficiencies
