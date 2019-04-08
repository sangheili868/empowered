import React, { Component } from 'react'
import EmpItemEditor from '../EmpItemEditor/EmpItemEditor'
import { startCase } from 'lodash'
import { warningText } from './EmpDocLoader.module.scss'

class EmpDocLoader extends Component {

  state = {
    documents: []
  }

  handleOpen = async () => {
    await this.fetchNames()
  }

  fetchNames = async () => {
    await fetch(`/api/${this.props.collection}/readAllNames`, { method: 'POST' })
      .then(response => {
        if(response.ok === false) {
          throw new Error('Cannot connect to server. Are you sure you are on the correct wifi?')
        } else {
          return response.json()
        }
      })
      .then(async rawDocuments => {
        const documents = rawDocuments.map(({ _id, name }) => ({ label: name, value: _id }))
        this.setState({ documents })
      })
  }

  handleLoad = ({ character: _id }) => {
    fetch(`/api/${this.props.collection}/read`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id })
    })
      .then(response => response.json())
      .then(document => {
        this.props.onLoad(document)
      })
  }

  renderDescription = () => {
    if (this.props.isUnnamed)
    return (
      <div className={warningText}>
        Warning! If you load a new {this.props.collection}, the existing {this.props.collection} data will be lost.
      </div>
    )
  }

  render () {
    return (
      <EmpItemEditor
        title={`Load a New ${startCase(this.props.collection)}`}
        fields={{
          character: {
            value: '',
            options: this.state.documents
          }
        }}
        onOpen={this.handleOpen}
        onSave={this.handleLoad}
        saveLabel="LOAD"
        description={this.renderDescription}
      >
        Load
      </EmpItemEditor>
    )
  }
}

export default EmpDocLoader
