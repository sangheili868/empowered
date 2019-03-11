import React, { Component } from 'react'
import {
  table,
  tableAdd,
  titleRow,
  cell,
  moreInfo,
  buy,
  columnHeader
} from './CharacterPage.module.scss'
import { map, chain, mapValues, isEmpty, some } from 'lodash'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import EmpCard from '../../EmpCard/EmpCard'
import EmpButton from '../../EmpButton/EmpButton'
import { Modal } from 'react-bootstrap'

class CharacterSheetTable extends Component {
  state = {
    openModal: ''
  }
  columnTitles = [
    ...Object.values(this.props.columnNames),
    ...this.props.onEdit ? ['Edit'] : [],
    ...this.props.buyButton ? ['Buy'] : [],
    ...this.props.sellButton ? ['Sell'] : []
  ]
  toggleModal = (modal='') => {
    this.setState(prevState => ({
      ...prevState,
      openModal: (modal === prevState.openModal) ? '' : modal
    }))
  }
  render () {
    const hasItems = !isEmpty(this.props.items) && some(this.props.items, item => !item.deleted)
    return (hasItems || this.props.onAdd) ? (
      <EmpCard isStartingOpen title={this.props.title}>
        <table className={table}>
          <thead>
            { hasItems &&
              <tr>
                {this.columnTitles.map(title =>
                  <th key={title} className={[columnHeader, cell].join(' ')}>{title}</th>
                )}
              </tr>
            }
          </thead>
          <tbody>
            {this.props.items
              .map((item, index) => !item.deleted &&
              <tr key={index}>
                {map(this.props.columnNames, (value, key) =>
                  <td key={key} className={cell}>
                    {(this.props.tooltips && this.props.tooltips[key]) ? (
                      <>
                        <Modal show={this.state.openModal === item[key]} onHide={this.toggleModal}>
                          <Modal.Header closeButton><Modal.Title>{item[this.props.tooltips[key].title]}</Modal.Title></Modal.Header>
                          <Modal.Body>{item[this.props.tooltips[key].body]}</Modal.Body>
                          <Modal.Footer><EmpButton onClick={this.toggleModal}>Close</EmpButton></Modal.Footer>
                        </Modal>
                        <div className={moreInfo} onClick={this.toggleModal.bind(this, item[key])}>
                          {item[key]}
                        </div>
                      </>
                    ) : (
                      item[key]
                    )}
                  </td>
                )}
                {this.props.onEdit &&
                  <td className={cell}>
                    <EmpItemEditor
                      isEdit
                      title={'Edit ' + item.name}
                      description={this.props.description && this.props.description(index)}
                      fields={chain(item)
                        .pick(Object.keys(this.props.fields))
                        .mapValues((value, key) => ({ value, default: this.props.fields[key]}))
                        .value()
                      }
                      onUpdate={this.props.onEdit.bind(this, index)}
                      onDelete={this.props.onDelete ? (
                        this.props.onDelete.bind(this, index)
                      ) : (
                        this.props.onEdit.bind(this, index, {deleted: true})
                      )}
                    />
                  </td>
                }
                {this.props.buyButton &&
                  <td className={[cell, buy].join(' ')}>
                    {this.props.buyButton(index)}
                  </td>
                }
                {this.props.sellButton &&
                  <td className={[cell, buy].join(' ')}>
                    {this.props.sellButton(index)}
                  </td>
                }
              </tr>
            )}
          </tbody>
          {this.props.onAdd &&
            <tfoot>
              <tr className={titleRow}>
                <td className={hasItems ? cell : ''} colSpan={this.columnTitles.length}>
                  <div className={tableAdd}>
                    {this.props.addText}
                    <EmpItemEditor
                      title={this.props.addText}
                      fields={mapValues(this.props.fields, value => ({ value, default: value }))}
                      onUpdate={this.props.onAdd}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          }
        </table>
      </EmpCard>
    ) : null
  }
}

export default CharacterSheetTable
