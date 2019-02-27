import React, { Component } from 'react'
import CharacterSheetStats from "./CharacterSheetStats"
import CharacterSheetBio from './CharacterSheetBio'
import CharacterSheetShop from './CharacterSheetShop'
import { header, name, portrait } from './CharacterPage.module.scss'
import EmpNavigator from '../../EmpNavigator/EmpNavigator'
import EmpEditor from '../../EmpEditor/EmpEditor'
class CharacterSheet extends Component {
  ancestry = this.props.character.bio.ancestry
  homeland = this.props.character.bio.homeland
  render () {
    return (
      <div>
        <div className={header}>
          <div>
            <EmpEditor
              className={name}
              value={this.props.character.name}
              onUpdate={name => this.props.onUpdate({name})}
            />
            <div>{this.props.character.bio.highConcept}</div>
            <div>{this.props.character.bio.flaw}</div>
            <div>
              {
                this.ancestry +
                (this.ancestry && this.homeland ? ' from ' : '') +
                this.homeland
              }
            </div>
          </div>
          <img
            alt="Character Portrait"
            src={this.props.character.portrait}
            className={portrait}
          />
        </div>
        <EmpNavigator routes={[
          {
            label: 'Bio',
            route: '/character/bio',
            component: CharacterSheetBio,
            props: {
              bio: this.props.character.bio,
              onUpdate: this.props.onUpdate
            }
          },
          {
            label: 'Stats',
            route: '/character/stats',
            component: CharacterSheetStats,
            props: {
              stats: this.props.character.stats,
              onUpdate: this.props.onUpdate
            }
          },
          {
            label: 'Shop',
            route: '/character/shop',
            component: CharacterSheetShop,
            props: {
              shop: this.props.character.shop
            }
          }
        ]}/>
      </div>
    )
  }
}

export default CharacterSheet