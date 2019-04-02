import React, { Component } from 'react'
import EmpModal from '../EmpModal/EmpModal'
import EmpItemEditorField from './EmpItemEditorField'
import { cloneDeep, mapValues, isObject, isEmpty, isFunction, pick, every } from 'lodash'

class EmpItemEditor extends Component {

  state = {
    workingValues: {}
  }

  get fieldKeys () {
    return isObject(this.props.fields) ? Object.keys(this.props.fields) : []
  }

  get description () {
    return isFunction(this.props.description) ? this.props.description(this.state.workingValues) : this.props.description
  }

  get isValid () {
    return every(this.state.workingValues, 'isValid')
  }

  get modalControls () {
    return [
      {
        label: 'DELETE',
        isHidden: !this.props.onDelete,
        onClick: this.props.onDelete,
        mode: 'warning'
      },
      {
        label: this.props.saveLabel || 'SAVE',
        isHidden: isEmpty(this.state.workingValues),
        onClick: this.handleDone,
        mode: 'secondary',
        isDisabled: !this.isValid
      }
    ]
  }

  handleOpen = async () => {
    this.setState({ workingValues: cloneDeep(this.props.fields) })
    if (this.props.onOpen) await this.props.onOpen()
    this.setState({ workingValues: cloneDeep(this.props.fields) })
  }

  handleDone = () => {
    this.props.onSave(mapValues(this.state.workingValues, value => isObject(value) ? value.value : value))
  }

  handleClose = () => {
    if (this.isValid) {
      this.toggleModal()
      this.handleDone()
    }
  }

  handleChange = newValues => {
    this.setState(prevState => ({
      ...prevState,
      workingValues: {
        ...prevState.workingValues,
        ...newValues
      }
    }))
  }

  render () {
    return (
      <EmpModal
        backdrop="static"
        {...pick(this.props, ['title', 'mode', 'isDisabled', 'children', 'className', 'style'])}
        body={
          <>
            {this.fieldKeys.map(key =>
              <EmpItemEditorField
                value={this.state.workingValues[key]}
                key={key}
                fieldName={key}
                onChange={this.handleChange}
                onClose={this.handleClose}
              />
            )}
            <div>
              {this.description}
            </div>
          </>
        }
        closeText="CANCEL"
        controls={this.modalControls}
        onOpen={this.handleOpen}
        setToggler={toggler => this.toggleModal = toggler}
      />
    )
  }
}

export default EmpItemEditor
