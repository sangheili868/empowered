import React, { Component } from 'react'
import EmpButton from '../../EmpButton/EmpButton'
import { warningText } from './CharacterPage.module.scss'

class CharacterSheetDelete extends Component {

  handleDelete = () => {
    fetch('/api/character/delete', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: this.props._id })
    })
    this.props.onDelete()
  }

  render () {
    return this.props._id ? (
      <div className={warningText}>
        Are you sure you want to delete this character? This will affect production data, even on a local server.
        <EmpButton onClick={this.handleDelete} mode="warning">KILL MY CHARACTER</EmpButton>
      </div>
    ) : (
      <div>Character has not been saved yet, so it cannot be deleted.</div>
    )
  }
}

export default CharacterSheetDelete
