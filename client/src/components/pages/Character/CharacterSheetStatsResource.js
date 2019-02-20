import React, { Component } from 'react'
import "./CharacterSheetStatsResource.scss"

class CharacterSheetStatsResource extends Component {
  render () {
    return (
      <div className={this.props.className}>
        <div className="resource-title">{this.props.title}</div>
        <div className="info">
          <img className="icon" src={this.props.icon}/>
          <div className="value">{this.props.value}</div>
          <div className="subtext">{this.props.subtext}</div>
        </div>
      </div>
    )
  }
}

export default CharacterSheetStatsResource