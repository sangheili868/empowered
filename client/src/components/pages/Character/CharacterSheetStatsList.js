import React, { Component } from 'react'
import { subtitles, subtitle, list, column, columnHeader } from './CharacterPage.module.scss'
import { startCase, some } from 'lodash'
import EmpCard from '../../EmpCard/EmpCard'

class CharacterSheetStatsList extends Component {
  render () {
    const hasSomeUndeletedItem = some(this.props.items, column => column.length && some(column, item => !item.deleted))
    return (hasSomeUndeletedItem || this.props.addToList) ? (
      <EmpCard isStartingOpen title={this.props.title}>
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
            (some(this.props.items[itemKey], item => !item.deleted) || this.props.addToList) &&
            <div key={itemKey} className={column}>
                <div className={columnHeader}>{startCase(itemKey)}</div>
                {this.props.items[itemKey].map((item, index) => !item.deleted && ( 
                  this.props.editItem ? this.props.editItem(itemKey, item, index) : (
                    <div key={index}>{item.name}</div>
                  )
                ))}
              </div>
            )
            )}
        </div>
      </EmpCard>
    ) : null
  }
}

export default CharacterSheetStatsList