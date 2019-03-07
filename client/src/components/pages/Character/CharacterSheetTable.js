import React, { Component } from 'react'
import {
  section,
  title,
  table,
  tableAdd,
  titleRow,
  cell,
  buy,
  columnHeader
} from './CharacterPage.module.scss'
import { map, chain, mapValues, isEmpty, some } from 'lodash'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'

class CharacterSheetTable extends Component {
  columnTitles = [
    ...Object.values(this.props.columnNames),
    ...this.props.onEdit ? ['Edit'] : [],
    ...this.props.buyButton ? ['Buy'] : [],
    ...this.props.sellButton ? ['Sell'] : []
  ]
  render () {
    const hasItems = !isEmpty(this.props.items) && some(this.props.items, item => !item.deleted)
    return (hasItems || this.props.onAdd) ? (
      <div>
        <div className={section}>
          <table className={table}>
            <thead>
              <tr className={titleRow}>
                <th className={title} colSpan={this.columnTitles.length}>
                  {this.props.title}
                </th>
              </tr>
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
                    <td key={key} className={cell}>{item[key]}</td> 
                  )}
                  {this.props.onEdit && 
                    <td className={cell}>
                      <EmpItemEditor
                        isEdit
                        isDeletable
                        title={'Edit ' + item.name}
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
        </div>
      </div>
    ) : null
  }
}

export default CharacterSheetTable