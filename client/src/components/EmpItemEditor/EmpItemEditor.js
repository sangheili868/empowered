import React, { Component } from 'react'
import EmpModal from '../EmpModal/EmpModal'
import EmpItemEditorField from './EmpItemEditorField'
import { cloneDeep, mapValues, isObject, isEmpty, isFunction, pick, every } from 'lodash'

class EmpItemEditor extends Component {

  state = {
    workingValues: {}
  }

  get validatedFields () {
    return mapValues(this.state.workingValues, field => ({
      ...field,
      isValid: this.validate(field)
    }))
  }

  validate (field) {
    if (field.validation === 'none') return true
    const trimmedValue = field.value && field.value.trim ? field.value.trim() : field.value
    const isValidNumber = !isNaN(Number(trimmedValue)) && trimmedValue !== '' && trimmedValue < 9e15
    if (field.validation === 'number') return isValidNumber
    if (field.validation === 'positive') return isValidNumber && trimmedValue > 0
    if (field.options) return field.options.map(({ value }) => value).includes(field.value)
    return trimmedValue
  }

  get fieldKeys () {
    return isObject(this.props.fields) ? Object.keys(this.props.fields) : []
  }

  get description () {
    return isFunction(this.props.description) ? this.props.description(this.validatedFields) : this.props.description
  }

  get isValid () {
    return every(this.validatedFields, 'isValid')
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
        isHidden: isEmpty(this.validatedFields),
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
    this.props.onSave(mapValues(this.validatedFields, value => isObject(value) ? value.value : value))
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
                value={this.validatedFields[key]}
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
