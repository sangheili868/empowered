import React, { Component } from 'react'
import CharacterSheetStats from "./CharacterSheetStats"
import CharacterSheetBio from './CharacterSheetBio'
import CharacterSheetShop from './CharacterSheetShop'
import { header, name, portrait } from './CharacterPage.module.scss'
import EmpNavigator from '../../EmpNavigator/EmpNavigator'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'

class CharacterSheet extends Component {
  render () {
    return (
      <div>
        <div className={header}>
          <div>
            <div className={name}>{this.props.character.name}</div>
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
            {this.props.character.portrait ? ( 
              <img
                alt='Failed to load character portrait'
                src={this.props.character.portrait}
                className={portrait}
              />
            ) : (
              <div>Add a portrait</div>
            )}
            <EmpItemEditor
              title="Enter the URL of an image."
              isDeletable
              isEdit={this.props.character.portrait}
              fields={{ portrait: this.props.character.portrait }}
              onUpdate={values => this.props.onUpdate({portrait: values.portrait})}
              onDelete={this.props.onUpdate.bind(this, {portrait: ''})}
            />
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
              shop: this.props.character.shop,
              stats: this.props.character.stats,
              onUpdate: this.props.onUpdate
            }
          }
        ]}/>
      </div>
    )
  }
}

export default CharacterSheet