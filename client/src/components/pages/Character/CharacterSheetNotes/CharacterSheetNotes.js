import React, { Component } from 'react'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import EmpCard from '../../../EmpCard/EmpCard'
import { noteContent, newNote } from './CharacterSheetNotes.module.scss'
import { sheetPage } from '../CharacterPage.module.scss'
import withoutIndex from '../../../../utils/withoutIndex'

class CharacterSheetNotes extends Component {

  handleEdit = (index, newNote) => {
    this.props.updateCharacter(`notes.${index}`, newNote)
  }

  handleDelete = index => {
    this.props.updateCharacter('notes', withoutIndex(this.props.notes, index))
  }

  handleSave = newNote => {
    this.props.updateCharacter('notes', [
      ...this.props.notes,
      newNote
    ])
  }

  render () {
    return (
      <>
        <div className={sheetPage}>
          {this.props.notes.map(({ title, content }, index) =>
            <EmpCard key={index} title={title} contentClassName={noteContent}>
              <EmpItemEditor
                title="Edit Note"
                fields={{
                  title: {
                    value: title
                  },
                  content: {
                    value: content,
                    isAllowingNewLines: true
                  }
                }}
                mode="text"
                onSave={this.handleEdit.bind(this, index)}
                onDelete={this.handleDelete.bind(this, index)}
              >
                {content}
              </EmpItemEditor>
            </EmpCard>
          )}
        </div>
        <EmpItemEditor
          title="Add Note"
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
          className={newNote}
          onSave={this.handleSave}
        >
          Add a New Note
        </EmpItemEditor>
      </>
    )
  }
}

export default CharacterSheetNotes
