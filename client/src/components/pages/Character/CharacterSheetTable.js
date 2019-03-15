import React, { Component } from 'react'
import {
  table,
  tableAdd,
  titleRow,
  disabled,
  cell,
  buy,
  columnHeader
} from './CharacterPage.module.scss'
import { map, mapValues, isEmpty } from 'lodash'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import EmpCard from '../../EmpCard/EmpCard'
import EmpModal from '../../EmpModal/EmpModal'

class CharacterSheetTable extends Component {
  columnTitles = [
    ...Object.values(this.props.columnNames),
    ...this.props.onEdit ? ['Edit'] : [],
    ...this.props.buyButton ? ['Buy'] : [],
    ...this.props.sellButton ? ['Sell'] : []
  ]
  render () {
    const hasItems = !isEmpty(this.props.items)
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
            {this.props.items.map((item, index) =>
              <tr key={index} className={item.isDisabled ? disabled : ''}>
                {map(this.props.columnNames, (value, key) =>
                  <td key={key} className={cell}>
                    {(this.props.tooltips && this.props.tooltips[key]) ? (
                      <EmpModal
                        title={item[this.props.tooltips[key].title]}
                        body={item[this.props.tooltips[key].body]}
                      >
                        {item[key]}
                      </EmpModal>
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
                      description={this.props.description}
                      fields={mapValues(this.props.fields, (field, key) => ({ ...field, value: item[key] }))}
                      onUpdate={this.props.onEdit.bind(this, index)}
                      onDelete={this.props.onDelete && this.props.onDelete.bind(this, index)}
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
                      description={this.props.description}
                      fields={mapValues(this.props.fields, field => ({ ...field, value: field.default }))}
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
