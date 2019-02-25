import React, { Component } from 'react'
import CharacterSheetStats from "./CharacterSheetStats"
import { header, name, portrait } from './CharacterPage.module.scss'

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
                this.props.character.bio.ancestry + " from " +
                this.props.character.bio.homeland
              }
            </div>
          </div>
          <img
            alt="Character Portrait"
            src={this.props.character.portrait}
            className={portrait}
          />
        </div>
        <CharacterSheetStats stats={this.props.character.stats}/>
      </div>
    )
  }
}

export default CharacterSheet