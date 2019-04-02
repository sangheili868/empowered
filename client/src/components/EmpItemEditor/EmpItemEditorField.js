import React, { Component } from 'react'
import { input, field, fieldLabel } from './EmpItemEditor.module.scss'
import EmpTextInput from '../EmpTextInput/EmpTextInput'
import EmpDropdown from '../EmpDropdown/EmpDropdown'
import { startCase } from 'lodash'

class EmpItemEditorField extends Component {

  componentDidMount () {
    this.props.onChange({ [this.props.fieldName]: {
      ...this.props.value,
      isValid: this.validate(this.props.value)
    }})
  }

  get selectedValue () {
    const isMultipleSelected = Array.isArray(this.props.value.value)
    return this.props.value.options.filter(({ value }) =>
      isMultipleSelected ? this.props.value.value.includes(value) : this.props.value.value === value
    )
  }

  get optionsWithAddAll () {
    const isAllSelected = this.props.value.value &&
      this.props.value.options.every(option => this.props.value.value.includes(option.value))
    const isShowingAddAll = this.props.value.isMulti && !isAllSelected
    return [
      ...(isShowingAddAll ? [{ label: 'Add all', value: 'addAllItems' }] : []),
      ...this.props.value.options
    ]
  }

  validate (field) {
    if (field.validation === 'none') return true
    const trimmedValue = field.value && field.value.trim ? field.value.trim() : field.value
    if (field.validation === 'number') return !isNaN(Number(trimmedValue)) && trimmedValue !== ''
    if (field.options) return field.options.map(({ value }) => value).includes(field.value)
    return trimmedValue
  }

  handleChange = rawValue => {
    const newValue = {
      ...this.props.value,
      value: rawValue
    }
    const isAddingAll = this.props.value.isMulti && newValue.value.includes('addAllItems')
    let valueToSet = isAddingAll ? {
      ...this.props.value,
      value: this.props.value.options.map(({ value }) => value)
    } : newValue
    valueToSet.isValid = this.validate(valueToSet)

    this.props.onChange({ [this.props.fieldName]: valueToSet })
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.props.onClose()
    }
  }

  render () {
    return (
      <div className={field}>
        <div className={fieldLabel}>{startCase(this.props.fieldName)}</div>
        {this.props.value && this.props.value.options ? (
          <EmpDropdown
            isMulti={this.props.value.isMulti}
            isInvalid={!this.props.value.isValid}
            value={this.selectedValue}
            options={this.optionsWithAddAll}
            className={input}
            onSelect={this.handleChange}
            isClearable={this.props.value.validation === 'none'}
          />
        ) : (
          <EmpTextInput
            className={input}
            isInvalid={!this.props.value.isValid}
            value={this.props.value.value}
            onChange={({target}) => this.handleChange(target.value)}
            onKeyPress={this.handleKeyPress}
          />
        )}
      </div>
    )
  }
}

export default EmpItemEditorField
