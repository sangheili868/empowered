import React, { Component } from 'react'
import { subtitles, subtitle, list, column, moreInfo, columnHeader } from './CharacterPage.module.scss'
import { startCase, some } from 'lodash'
import EmpCard from '../../EmpCard/EmpCard'
import EmpModal from '../../EmpModal/EmpModal'

class CharacterSheetStatsList extends Component {
  render () {
    const isArray = Array.isArray(this.props.items)
    const isObject = !isArray && (typeof this.props.items === 'object')
    const hasSomeUndeletedItem = (isArray && this.props.items.length) ||
    (isObject && some(this.props.items, column => column.length && some(column, item => !item.deleted)))
    return (hasSomeUndeletedItem || this.props.addToList) ? (
      <EmpCard isStartingOpen={hasSomeUndeletedItem} title={this.props.title}>
        <div className={subtitles}>
          {this.props.subtitles && this.props.subtitles.map((subtitleText, index) =>
            <div key={index} className={subtitle}>{subtitleText}</div>
            )}
        </div>
        <div className={list}>
          {isArray ? (
            <div className={column}>
              {this.props.items.map((item, index) => !item.deleted && (
                this.props.editItem ? this.props.editItem(item, index) : (
                  <div key={index}>{item.name}</div>
                )
              ))}
              {this.props.addToList && this.props.addToList()}
            </div>
          ) : (isObject &&
          Object.keys(this.props.items).map(itemKey =>
            (some(this.props.items[itemKey], item => !item.deleted) || this.props.addToList) &&
            <div key={itemKey} className={column}>
                <div className={columnHeader}>{startCase(itemKey)}</div>
                {this.props.items[itemKey].map((item, index) => !item.deleted && (
                  this.props.editItem ? this.props.editItem(itemKey, item, index) : (
                    (this.props.tooltips) ? (
                      <EmpModal
                        key={index}
                        title={item[this.props.tooltips.title]}
                        body={item[this.props.tooltips.body]}
                        className={moreInfo}
                      >
                        {item.name}
                      </EmpModal>
                    ) : (
                      <div key={index}>{item.name}</div>
                    )
                  )
                ))}
                {this.props.addToList && this.props.addToList(itemKey)}
              </div>
            )
            )}
        </div>
      </EmpCard>
    ) : null
  }
}

export default CharacterSheetStatsList
