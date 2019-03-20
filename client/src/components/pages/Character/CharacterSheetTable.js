import React, { Component } from 'react'
import {
  table,
  tableAdd,
  cell,
  plus,
  columnHeader
} from './CharacterPage.module.scss'
import { mapValues, isEmpty } from 'lodash'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import EmpCard from '../../EmpCard/EmpCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CharacterSheetTableRow from './CharacterSheetTableRow'

class CharacterSheetTable extends Component {
  columnTitles = [
    ...Object.values(this.props.columnNames),
    ...this.props.buyButton ? ['Buy'] : [],
    ...this.props.sellButton ? ['Sell'] : []
  ]
  render () {
    const hasItems = !isEmpty(this.props.items)
    return (hasItems || this.props.onAdd) ? (
      <EmpCard isStartingOpen title={this.props.title}>
        <table className={table}>
          <thead>
            {hasItems &&
              <tr>
                {this.columnTitles.map(title =>
                  <th key={title} className={[columnHeader, cell].join(' ')}>{title}</th>
                )}
              </tr>
            }
          </thead>
          <tbody>
            {this.props.items.map((item, index) =>
              <CharacterSheetTableRow key={index} item={item} index={index} {...this.props}/>
            )}
          </tbody>
          {this.props.onAdd &&
            <tfoot>
              <tr>
                <td className={hasItems ? cell : ''} colSpan={this.columnTitles.length}>
                  <div className={tableAdd}>
                    <EmpItemEditor
                      title={this.props.addText}
                      description={this.props.description}
                      fields={mapValues(this.props.fields, field => ({ ...field, value: field.default }))}
                      mode="noStyle"
                      onSave={this.props.onAdd}
                    >
                      <FontAwesomeIcon className={plus} icon={'plus-square'}/>
                    </EmpItemEditor>
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
