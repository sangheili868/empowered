import React, { Component } from 'react'
import { section, title, table, cell, columnHeader } from './CharacterPage.module.scss'
import { map } from 'lodash'
class CharacterSheetStatsTable extends Component {
  render () {
    return (
      <div>
        <div className={section}>
          <table className={table}>
            <thead>
              <tr>
                <td className={title} colSpan={Object.keys(this.props.columnNames).length}>
                  {this.props.title}
                </td>
              </tr>
              <tr>
                {map(this.props.columnNames, (value, key) =>
                  <th key={key} className={[columnHeader, cell].join(' ')}>{value}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {this.props.items.map((item, index) => 
                <tr key={index}>
                  {map(this.props.columnNames, (value, key) =>
                    <td key={key} className={cell}>{item[key]}</td> 
                  )}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default CharacterSheetStatsTable