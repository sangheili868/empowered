import React, { Component } from 'react'
import { table, tableAdd, cell, columnHeader } from './CharacterSheetTable.module.scss'
import { plus } from '../CharacterPage.module.scss'
import { isEmpty } from 'lodash'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import EmpCard from '../../../EmpCard/EmpCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CharacterSheetTableRow from './CharacterSheetTableRow'

class CharacterSheetTable extends Component {

  columnTitles = [
    ...Object.values(this.props.columnNames),
    ...this.props.buyButton ? ['Buy'] : [],
    ...this.props.sellButton ? ['Sell'] : []
  ]

  get hasItems () {
    return !isEmpty(this.props.items)
  }

  render () {
    return (this.hasItems || this.props.onAdd) ? (
      <EmpCard isStartingOpen title={this.props.title}>
        <table className={table}>
          <thead>
            {this.hasItems &&
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
                <td className={this.hasItems ? cell : ''} colSpan={this.columnTitles.length}>
                  <div className={tableAdd}>
                    <EmpItemEditor
                      title={this.props.addText}
                      description={this.props.description}
                      fields={this.props.fields}
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
