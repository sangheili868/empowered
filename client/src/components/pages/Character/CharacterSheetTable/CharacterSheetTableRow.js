import React, { Component } from 'react'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor';
import { cell } from './CharacterSheetTable.module.scss'
import { map, mapValues } from 'lodash'
import EmpModal from '../../../EmpModal/EmpModal';

class CharacterSheetTableRow extends Component {

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
          <td key={key} className={cell}>{this.props.item[key]}</td>
        )}
        {this.props.buyButton &&
          <td className={cell}>{this.props.buyButton(this.props.index)}</td>
        }
        {this.props.sellButton &&
          <td className={cell}>{this.props.sellButton(this.props.index)}</td>
        }
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

export default CharacterSheetTableRow
