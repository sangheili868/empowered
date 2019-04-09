import React, { Component } from 'react'
import { startCase } from 'lodash'
import { bio, table, cell, field } from './EmpTable.module.scss'
import EmpItemEditor from '../EmpItemEditor/EmpItemEditor'

class EmpTableStrings extends Component {

  calcDetails = (content, isTruncating) => {
    const truncatedDetails = content.slice(0, 30) + '...'
    return (isTruncating && content && content.length > 30) ? truncatedDetails : content
  }

  getFields = ({ content, isAllowingNewLines, validation, isTitleEditable, title }) => {
    return {
      ...(isTitleEditable ? { title: { value: title } } : {}),
      content: {
        value: content || '',
        isAllowingNewLines,
        validation
      }
    }
  }

  render () {
    return (
      <table className={[bio, table].join(' ')}>
        <tbody>
          {this.props.items.map((row, index) =>
            <EmpItemEditor
              key={index}
              title={'Edit ' + startCase(row.title)}
              mode="tr"
              description={row.description}
              fields={this.getFields(row)}
              onSave={this.props.onSave.bind(this, index)}
              onDelete={this.props.onDelete && this.props.onDelete.bind(this, index)}
            >
              <td className={[cell, field].join(' ')}>{startCase(row.title)}</td>
              <td className={cell}>{this.calcDetails(row.content, row.isTruncating)}</td>
            </EmpItemEditor>
          )}
        </tbody>
      </table>
    )
  }
}

export default EmpTableStrings
