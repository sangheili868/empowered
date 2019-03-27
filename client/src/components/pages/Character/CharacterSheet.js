import React, { Component } from 'react'
import CharacterSheetStats from "./CharacterSheetStats/CharacterSheetStats"
import CharacterSheetBio from './CharacterSheetTable/CharacterSheetBio'
import CharacterSheetShop from './CharacterSheetShop/CharacterSheetShop'
import { header, name, portrait } from './CharacterPage.module.scss'
import EmpNavigator from '../../EmpNavigator/EmpNavigator'

class CharacterSheet extends Component {
  render () {
    return (
      <div>
        <div className={header}>
          <div>
            <div className={name}>{this.props.character.bio.name || 'Unnamed Character'}</div>
            <div>{this.props.character.bio.highConcept}</div>
            <div>{this.props.character.bio.flaw}</div>
            <div>
              {
                this.props.character.bio.ancestry +
                (this.props.character.bio.ancestry &&
                  this.props.character.bio.homeland ? ' from ' : '') +
                this.props.character.bio.homeland
              }
            </div>
          </div>
          <div>
            {this.props.character.bio.portrait &&
              <img
                alt='Failed to load character portrait'
                src={this.props.character.bio.portrait}
                className={portrait}
              />
            }
          </div>
        </div>
        <EmpNavigator routes={[
          {
            label: 'Bio',
            route: '/character/bio',
            component: CharacterSheetBio,
            props: {
              bio: this.props.character.bio,
              name: this.props.character.name,
              portrait: this.props.character.portrait,
              updateCharacter: this.props.updateCharacter
            }
          },
          {
            label: 'Stats',
            route: '/character/stats',
            component: CharacterSheetStats,
            props: {
              stats: this.props.character.stats,
              shop: this.props.character.shop,
              updateCharacter: this.props.updateCharacter
            }
          },
          {
            label: 'Shop',
            route: '/character/shop',
            component: CharacterSheetShop,
            props: {
              shop: this.props.character.shop,
              stats: this.props.character.stats,
              updateCharacter: this.props.updateCharacter
            }
          }
        ]}/>
      </div>
    )
  }
}

export default CharacterSheet
