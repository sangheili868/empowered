import React, { Component } from 'react'
import { subtitles, subtitle, list, column, moreInfo, columnHeader } from './CharacterPage.module.scss'
import { startCase, some } from 'lodash'
import EmpCard from '../../EmpCard/EmpCard'
import EmpButton from '../../EmpButton/EmpButton'
import { Modal } from 'react-bootstrap'

class CharacterSheetStatsList extends Component {
  state = {
    openModal: ''
  }
  toggleModal = (modal='') => {
    this.setState(prevState => ({
      ...prevState,
      openModal: (modal === prevState.openModal) ? '' : modal
    }))
  }
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
              {this.props.items.map((item, index) => !item.deleted && (
                this.props.editItem ? this.props.editItem(item, index) : (
                  <div key={index}>{item.name}</div>
                )
              ))}
              {this.props.addToList && this.props.addToList()}
            </div>
          ) : (typeof this.props.items === 'object' &&
          Object.keys(this.props.items).map(itemKey =>
            (some(this.props.items[itemKey], item => !item.deleted) || this.props.addToList) &&
            <div key={itemKey} className={column}>
                <div className={columnHeader}>{startCase(itemKey)}</div>
                {this.props.items[itemKey].map((item, index) => !item.deleted && (
                  this.props.editItem ? this.props.editItem(itemKey, item, index) : (
                    (this.props.tooltips) ? (
                      <>
                        <Modal show={this.state.openModal === item.name} onHide={this.toggleModal}>
                          <Modal.Header closeButton><Modal.Title>{item[this.props.tooltips.title]}</Modal.Title></Modal.Header>
                          <Modal.Body>{item[this.props.tooltips.body]}</Modal.Body>
                          <Modal.Footer><EmpButton onClick={this.toggleModal}>Close</EmpButton></Modal.Footer>
                        </Modal>
                        <div className={moreInfo} onClick={this.toggleModal.bind(this, item.name)}>
                          {item.name}
                        </div>
                      </>
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
