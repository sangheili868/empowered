import React, { Component } from 'react'
import CharacterSheetResource from './CharacterSheetResource'
import { detailTitle } from '../CharacterPage.module.scss'
import armorIcon from "../../../../icons/armor.png"
import shieldIcon from "../../../../icons/shield.png"
import agilityIcon from "../../../../icons/crosshair.png"
import speedIcon from "../../../../icons/foot.png"
import armorData from '../../../../gameData/armor.json'
import shieldData from '../../../../gameData/shields.json'
import equipmentProficiencyData from '../../../../gameData/equipmentProficiencies.json'
import CharacterSheetTrait from './CharacterSheetTrait'

class CharacterSheetStatsResourcesTraits extends Component {

  renderDescription = (categoryData, featuresByCategory, isNeedingOpenHand, { category: selectedCategory }) => {
    let proficiencyDescription = ''
    let featuresDescription = ''
    let selectedCategoryData = {}
    const hasSelected = selectedCategory && selectedCategory.value && !Array.isArray(selectedCategory.value)
    const hasNoOpenHands = isNeedingOpenHand && this.isUnableToAddShield

    if (hasSelected) {
      selectedCategoryData = categoryData.find(cat => cat.category === selectedCategory.value)
      const selectedProficiencyData = equipmentProficiencyData[selectedCategoryData.proficiency]
      const selectedCategoryFeatures = featuresByCategory[selectedCategory.value]

      proficiencyDescription = selectedProficiencyData && selectedProficiencyData.description
      featuresDescription = selectedCategoryFeatures && selectedCategoryFeatures.map(({name}) => name).join(', ')
    }

    return (
      <>
        {hasNoOpenHands &&
          <div>Both of your hands are holding items. Unequip a weapon to use a shield.</div>
        }
        <div>{proficiencyDescription}</div>
        {featuresDescription &&
          <>
            <div className={detailTitle}>Features Related to {selectedCategoryData.displayName}</div>
            <div>{featuresDescription}</div>
          </>
        }
      </>
    )
  }

  handleSpeedUpdate = (path, {baseValue, type}) => this.props.updateCharacter(path, {
    baseValue: parseInt(baseValue),
    type
  })

  get isUnableToAddShield () {
    return this.props.loadout.hands.length >= 2 && this.props.shield.category === 'none'
  }

  get shieldFields () {
    const { displayName, category} = shieldData.find(({ proficiency }) => proficiency === 'none')
    const options = this.isUnableToAddShield ? [{ label: displayName, value: category }] : this.props.shield.options
    return {
      name: {
        value: this.props.shield.name
      },
      category: {
        value: this.props.shield.category,
        options
      }
    }
  }

  render () {
    return (
      <>
        <CharacterSheetResource title="Evasion" value={this.props.evasion} icon={agilityIcon}/>
        {this.props.shield.hasShieldProficiency &&
          <CharacterSheetTrait
            trait="shield"
            value={this.props.shield.rating}
            subtext={this.props.shield.name || this.props.shield.displayName}
            icon={shieldIcon}
            hasFeatures={this.props.shield.hasFeatures}
            fields={this.shieldFields}
            description={this.renderDescription.bind(this, shieldData, this.props.shield.features, true)}
            onUpdate={this.props.updateCharacter}
          />
        }
        {this.props.armor.options.length > 1 &&
          <CharacterSheetTrait
            trait="armor"
            value={this.props.armor.rating}
            subtext={this.props.armor.name || this.props.armor.displayName}
            icon={armorIcon}
            hasFeatures={this.props.armor.hasFeatures}
            fields={{
              name: {
                value: this.props.armor.name
              },
              category: {
                value: this.props.armor.category,
                options: this.props.armor.options
              }
            }}
            description={this.renderDescription.bind(this, armorData, this.props.armor.features, false)}
            onUpdate={this.props.updateCharacter}
          />
        }
        <CharacterSheetTrait
          trait="speed"
          value={this.props.speed.rating + 'ft.'}
          subtext={this.props.speed.type}
          icon={speedIcon}
          hasFeatures={this.props.speed.modifierNames.length > 0}
          fields={{
            type: {
              value: this.props.speed.type
            }
          }}
          description={this.props.speed.modifierNames.length > 0 &&
            <>
              <div className={detailTitle}>Modifiers:</div>
              <div>{this.props.speed.modifierNames.join(', ')}</div>
            </>
          }
          onUpdate={this.handleSpeedUpdate}
        />
      </>
    )
  }
}

export default CharacterSheetStatsResourcesTraits
