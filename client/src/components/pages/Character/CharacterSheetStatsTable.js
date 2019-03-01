import React, { Component } from 'react'
import { section, title, table, tableAdd, titleRow, cell, columnHeader } from './CharacterPage.module.scss'
import { map, pick, startCase } from 'lodash'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import pluralize from 'pluralize'

class CharacterSheetStatsTable extends Component {
  columnTitles = this.props.isEditable ? [
    ...Object.values(this.props.columnNames),
    'Edit'
  ] : Object.values(this.props.columnNames)
  render () {
    return (
      <div>
        <div className={section}>
          <table className={table}>
            <thead>
              <tr className={titleRow}>
                <th className={title} colSpan={this.columnTitles.length}>
                  {startCase(pluralize(this.props.title))}
                </th>
              </tr>
              { this.props.items.length > 0 &&
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
                  {this.props.isEditable && 
                    <td className={cell}>
                      <EmpItemEditor
                        isEdit
                        isDeletable
                        title={'Edit ' + item.name}
                        fields={pick(item, Object.keys(this.props.fields))}
                        onUpdate={this.props.onEdit.bind(this, index)}
                        onDelete={this.props.onEdit.bind(this, index, {deleted: true})}
                      />
                    </td>
                  }
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className={titleRow}>
                <td colSpan={this.columnTitles.length}>
                  <div className={tableAdd}>
                    Add {this.props.title}
                    <EmpItemEditor
                      title={'Add a ' + this.props.title}
                      fields={this.props.fields}
                      onUpdate={this.props.onAdd}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    )
  }
}

export default CharacterSheetStatsTable