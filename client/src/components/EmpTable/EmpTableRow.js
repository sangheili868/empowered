import React, { Component } from 'react'
import EmpItemEditor from '../EmpItemEditor/EmpItemEditor';
import { cell } from './EmpTable.module.scss'
import { map, mapValues } from 'lodash'
import EmpModal from '../EmpModal/EmpModal';

class EmpTableRow extends Component {

  get fields () {
    return mapValues(this.props.fields, (field, key) => ({ ...field, value: this.props.item[key] }))
  }

  get handleDelete () {
    return this.props.onDelete && this.props.onDelete.bind(this, this.props.index)
  }

  renderRowItems = () => {
    return (
      <>
        {map(this.props.columnNames, (value, key) =>
          <td key={key} className={cell}>
            {this.props.renderFields && this.props.renderFields[key] ? (
              this.props.renderFields[key](this.props.item, this.props.index)
            ) : this.props.item[key]}
          </td>
        )}
        {map(this.props.customFields, ({ render }, index) => (
          <td key={index} className={cell}>{render(this.props.index)}</td>
        ))}
      </>
    )
  }

  render () {
    if (this.props.tooltip) {
      return (
        <EmpModal
          title={this.props.tooltip.title(this.props.item)}
          mode="tr"
          body={this.props.tooltip.body(this.props.item)}
        >
          {this.renderRowItems()}
        </EmpModal>
      )
    } else if (this.props.onEdit) {
      return (
        <EmpItemEditor
          title={'Edit ' + this.props.item.name}
          mode="tr"
          description={this.props.description}
          fields={this.fields}
          onOpen={this.props.onOpen}
          onSave={this.props.onEdit.bind(this, this.props.index)}
          onDelete={this.props.onDelete && this.handleDelete}
        >
          {this.renderRowItems()}
        </EmpItemEditor>
      )
    } else {
      return (
        <tr>
          {this.renderRowItems()}
        </tr>
      )
    }
  }
}

export default EmpTableRow
