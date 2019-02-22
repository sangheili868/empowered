import React, { Component } from 'react'
import { section, title, table, column } from './CharacterPage.module.scss'

class CharacterSheetStatsList extends Component {
  render () {
    return (
      <div className={section}>
        <div className={title}>{this.props.title}</div>
        <br/>
        <div className={table}>
          <div className={column}>
            {this.props.items.map((item, index) =>
              <div key={index}>{item}</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default CharacterSheetStatsList