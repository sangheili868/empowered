import React, { Component } from 'react'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import { bio, table, cell, field, bioAdd } from './CharacterSheetTable.module.scss'
import withoutIndex from '../../../../utils/withoutIndex'

class CharacterSheetBioCustom extends Component {

  handleEdit = (index, newBio) => {
    this.props.updateCharacter(`bio.customs.${index}`, newBio)
  }

  handleDelete = index => {
    this.props.updateCharacter('bio.customs', withoutIndex(this.props.bios, index))
  }

  handleSave = newBio => {
    this.props.updateCharacter('bio.customs', [
      ...this.props.bios,
      newBio
  ])
}

  render () {
    return (
      <>
      <table className={[bio, table].join(' ')}>
        <tbody>
          {this.props.bios.map(({ title, content }, index) =>
            <EmpItemEditor
              key={index}
              title="Edit Custom Bio Field"
              mode="tr"
              fields={{
                title: {
                  value: title
                },
                content: {
                  value: content,
                  isAllowingNewLines: true
                }
              }}
              onSave={this.handleEdit.bind(this, index)}
              onDelete={this.handleDelete.bind(this, index)}
            >
              <td className={[cell, field].join(' ')}>{title}</td>
              <td className={cell}>{content}</td>
            </EmpItemEditor>
          )}
          </tbody>
        </table>
        <EmpItemEditor
          title="Add Custom Bio FIeld"
          fields={{
            title: {
              value: ''
            },
            content: {
              value: '',
              isAllowingNewLines: true
            }
          }}
          mode="success"
          className={bioAdd}
          onSave={this.handleSave}
        >
          Add a New Bio Field
        </EmpItemEditor>
      </>
    )
  }
}

export default CharacterSheetBioCustom
