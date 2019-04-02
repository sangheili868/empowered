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

  renderDescription = (categoryData, featuresByCategory, { category: selectedCategory }) => {
    let proficiencyDescription = ''
    let featuresDescription = ''
    const hasSelected = selectedCategory && selectedCategory.value && !Array.isArray(selectedCategory.value)

    if (hasSelected) {
      const selectedCategoryData = categoryData.find(cat => cat.category === selectedCategory.value)
      const selectedProficiencyData = equipmentProficiencyData[selectedCategoryData.proficiency]
      const selectedCategoryFeatures = featuresByCategory[selectedCategory.value]

      proficiencyDescription = selectedProficiencyData && selectedProficiencyData.description
      featuresDescription = selectedCategoryFeatures && selectedCategoryFeatures.map(({name}) => name).join(', ')

      return (
        <>
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
  }

  handleSpeedUpdate = (path, {baseValue, type}) => this.props.updateCharacter(path, {
    baseValue: parseInt(baseValue),
    type
  })

  render () {
    return (
      <>
        <CharacterSheetResource title="Evasion" value={this.props.evasion} icon={agilityIcon}/>
        {this.props.shield.options.length > 1 &&
          <CharacterSheetTrait
            trait="shield"
            value={this.props.shield.rating}
            subtext={this.props.shield.name || this.props.shield.displayName}
            icon={shieldIcon}
            hasFeatures={this.props.shield.hasFeatures}
            fields={{
              name: {
                value: this.props.shield.name
              },
              category: {
                value: this.props.shield.category,
                options: this.props.shield.options
              }
            }}
            description={this.renderDescription.bind(this, shieldData, this.props.shield.features)}
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
            description={this.renderDescription.bind(this, armorData, this.props.armor.features)}
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
