import React, { Component } from 'react'
import CharacterSheetStats from "./CharacterSheetStats"
import "./characterSheet.scss"

class CharacterSheet extends Component {
  render () {
    return (
      <div>
        <div className="sheet-header">
          <div>
            <div className="character-name">{this.props.character.name}</div>
            <div className="concept">{this.props.character.bio.highConcept}</div>
            <div className="concept">{this.props.character.bio.flaw}</div>
            <div className="concept">
              {this.props.character.bio.ancestry} from {this.props.character.bio.homeland}
            </div>
          </div>
          <img src={this.props.character.portrait} className="portrait"/>
        </div>
        <CharacterSheetStats stats={this.props.character.stats}/>
      </div>
    )
  }
}

export default CharacterSheet