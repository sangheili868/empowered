import React, { Component } from 'react'
import { sheetPage, resources } from '../CharacterPage.module.scss'
import { unlockText, unlockButton } from './CharacterSheetShop.module.scss'
import advancementsIcon from "../../../../icons/chevron.png"
import { pick } from 'lodash'
import CharacterSheetResource from '../CharacterSheetResources/CharacterSheetResource'
import CharacterSheetShopAbilityScores from './CharacterSheetShopAbilityScores'
import EmpSkillTable from '../../../EmpSkillTable/EmpSkillTable'
import CharacterSheetShopPowerDice from './CharacterSheetShopPowerDice'
import CharacterSheetShopFeatures from './CharacterSheetShopFeatures'
import CharacterSheetShopProficiencies from './CharacterSheetShopProficiencies'
import EmpTable from '../../../EmpTable/EmpTable'
import EmpButton from '../../../EmpButton/EmpButton'

class CharacterSheetShop extends Component {

  renderSellBackButton = index => {
    const item = this.props.shop.sellBack[index]
    return (
      <EmpButton mode="warning" onClick={item.handleDelete.bind(this, this.props.updateCharacter)}>
        +{item.worth} Adv.
      </EmpButton>
    )
  }

  handleUnlock = () => {
    this.props.updateCharacter([
      { path: 'shop.unlocked', value: true },
      { path: 'shop.advancements', value: this.props.shop.advancements + 15 }
    ])
  }

  handleUpdateAdvancements = (value, delta) => {
    this.props.updateCharacter([
      { path: 'shop.advancements', value },
      { path: 'shop.totalEarned', value: this.props.shop.totalEarned + delta }
    ])
  }

  render () {
    return (
      <>
        <div className={resources}>
          <CharacterSheetResource
            title="Advancements"
            value={this.props.shop.advancements}
            onUpdate={this.handleUpdateAdvancements}
            alt="Advancements Icon"
            icon={advancementsIcon}
          >
            Total Earned: {this.props.shop.totalEarned}
          </CharacterSheetResource>

        </div>
        <div className={sheetPage}>
          <CharacterSheetShopAbilityScores
            {...pick(this.props.shop, ['advancements', 'abilityScores', 'unlocked'])}
            hitPoints={this.props.stats.hitPoints}
            updateCharacter={this.props.updateCharacter}
          />
          <EmpSkillTable
            abilityScores={this.props.stats.abilityScores}
            skills={this.props.stats.skills}
          />
          {this.props.shop.unlocked &&
            <>
              <CharacterSheetShopPowerDice
                {...pick(this.props.shop, ['advancements', 'powerDice'])}
                updateCharacter={this.props.updateCharacter}
              />
              <CharacterSheetShopFeatures
                {...pick(this.props.shop, ['advancements', 'features'])}
                currentStatsFeatures={this.props.stats.base.features}
                currentShopFeatures={this.props.shop.base.features}
                updateCharacter={this.props.updateCharacter}
              />
              <CharacterSheetShopProficiencies
                {...pick(this.props.shop, ['advancements', 'proficiencies'])}
                currentProficiencies={this.props.stats.base.proficiencies}
                languageCount={this.props.stats.proficiencies.languages.length}
                synergy={this.props.stats.skills.synergy.value}
                updateCharacter={this.props.updateCharacter}
              />
              <EmpTable
                title="Sell Back"
                items={this.props.shop.sellBack}
                columnNames={{ name: 'Name', type: 'Type' }}
                customFields={[
                  {
                    title: 'Sell',
                    render: this.renderSellBackButton
                  }
                ]}
              />
            </>
          }
        </div>
        {!this.props.shop.unlocked &&
          <div>
            <div className={unlockText}>
              Once your DM adds features to your shop, you will be able to purchase power
              dice, features, proficiencies. Alternatively, click below to unlock the full
              shop. However, you will need to add features yourself.
            </div>
            <EmpButton mode='secondary' className={unlockButton} onClick={this.handleUnlock}>
              Unlock Full Shop
            </EmpButton>
          </div>
        }
      </>
    )
  }
}

export default CharacterSheetShop
