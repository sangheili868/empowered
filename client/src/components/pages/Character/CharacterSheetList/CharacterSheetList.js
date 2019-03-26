import React, { Component } from 'react'
import { subtitles, subtitle, list, moreInfo, listHeader } from './CharacterSheetList.module.scss'
import { startCase, some } from 'lodash'
import EmpCard from '../../../EmpCard/EmpCard'
import EmpModal from '../../../EmpModal/EmpModal'

class CharacterSheetStatsList extends Component {
  render () {
    const isArray = Array.isArray(this.props.items)
    const isObject = !isArray && (typeof this.props.items === 'object')
    const hasSomeItem = (isArray && this.props.items.length) || (isObject && some(this.props.items, column => column.length))
    return (hasSomeItem || this.props.addToList) ? (
      <EmpCard isStartingOpen title={this.props.title}>
        <div className={subtitles}>
          {this.props.subtitles && this.props.subtitles.map((subtitleText, index) =>
            <div key={index} className={subtitle}>{subtitleText}</div>
            )}
        </div>
        <div className={list}>
          {isArray ? (
            <div>
              {this.props.items.map((item, index) =>
                this.props.editItem ? this.props.editItem(item, index) : (
                  <div key={index}>{item.name}</div>
                )
              )}
              {this.props.addToList && this.props.addToList()}
            </div>
          ) : (isObject &&
          Object.keys(this.props.items).map(itemKey =>
            (this.props.items[itemKey].length || this.props.addToList) &&
              <div key={itemKey}>
                <div className={listHeader}>{startCase(itemKey)}</div>
                {this.props.items[itemKey].map((item, index) =>
                  this.props.editItem ? this.props.editItem(itemKey, item, index) : (
                    (this.props.tooltips) ? (
                      <EmpModal
                        key={index}
                        mode={this.props.tooltips.mode(item)}
                        title={this.props.tooltips.title(item)}
                        body={this.props.tooltips.body(item)}
                        className={moreInfo}
                      >
                        {item.name}
                      </EmpModal>
                    ) : (
                      <div key={index}>{item.name}</div>
                    )
                  )
                )}
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
