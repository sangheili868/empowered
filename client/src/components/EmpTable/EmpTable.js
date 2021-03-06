import React, { Component } from 'react'
import { table, tableAdd, cell, columnHeader } from './EmpTable.module.scss'
import { isEmpty } from 'lodash'
import EmpItemEditor from '../EmpItemEditor/EmpItemEditor'
import EmpCard from '../EmpCard/EmpCard'
import EmpIconButton from '../EmpIconButton/EmpIconButton'
import EmpTableRow from './EmpTableRow'

class EmpTable extends Component {

  get columnTitles () {
    return [
      ...Object.values(this.props.columnNames),
      ...((this.props.customFields && this.props.customFields.map(({ title }) => title)) || [])
    ]
  }

  get hasItems () {
    return !isEmpty(this.props.items)
  }

  render () {
    return (this.hasItems || this.props.onAdd) ? (
      <EmpCard isStartingOpen title={this.props.title}>
        <table className={table}>
          <thead>
            {this.hasItems && !this.props.isHidingColumnNames &&
              <tr>
                {this.columnTitles.map(title =>
                  <th key={title} className={[columnHeader, cell].join(' ')}>{title}</th>
                )}
              </tr>
            }
          </thead>
          <tbody>
            {this.props.items.map((item, index) =>
              <EmpTableRow key={index} item={item} index={index} {...this.props}/>
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
                      onOpen={this.props.onOpen}
                    >
                      <EmpIconButton color="success" icon="plus"/>
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

export default EmpTable
