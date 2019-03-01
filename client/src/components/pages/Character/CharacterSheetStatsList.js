import React, { Component } from 'react'
import { section, title, subtitles, subtitle, list, column, columnHeader } from './CharacterPage.module.scss'
import { startCase } from 'lodash'
class CharacterSheetStatsList extends Component {
  render () {
    return (
      <div className={section}>
        <div className={title}>{this.props.title}</div>
        <div className={subtitles}>
          {this.props.subtitles && this.props.subtitles.map(subtitleText =>
            <div className={subtitle}>{subtitleText}</div>
          )}
        </div>
        <div className={list}>
          {Array.isArray(this.props.items) ? (
            <div className={column}>
              {this.props.items.map((item, index) =>
                <div key={index}>{item}</div>
              )}
            </div>
          ) : (typeof this.props.items === 'object' &&
            Object.keys(this.props.items).map(itemKey => 
            <div key={itemKey} className={column}>
              <div className={columnHeader}>{startCase(itemKey)}</div>
              {this.props.items[itemKey].map((item, index) =>
                <div key={index}>{item}</div>
              )}
              {this.props.addToList && this.props.addToList(itemKey)}
            </div>
            )
          )}
        </div>
      </div>
    )
  }
}

export default CharacterSheetStatsList