import React, { Component } from 'react'
import { section, title, subtitles, subtitle, list, column, columnHeader } from './CharacterPage.module.scss'
import { startCase, some } from 'lodash'

class CharacterSheetStatsList extends Component {
  render () {
    return (some(this.props.items, item => item.length) || this.props.addToList) ? (
      <div className={section}>
        <div className={title}>{this.props.title}</div>
        <div className={subtitles}>
          {this.props.subtitles && this.props.subtitles.map((subtitleText, index) =>
            <div key={index} className={subtitle}>{subtitleText}</div>
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
              {this.props.items[itemKey].map((item, index) => !item.deleted && ( 
                this.props.editItem ? this.props.editItem(itemKey, item, index) : (
                  <div key={index}>{item.name}</div>
                )
              ))}
              {this.props.addToList && this.props.addToList(itemKey)}
            </div>
            )
          )}
        </div>
      </div>
    ) : null
  }
}

export default CharacterSheetStatsList