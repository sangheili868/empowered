import React, { Component } from 'react'
import { input, field, fieldLabel } from './EmpItemEditor.module.scss'
import EmpTextInput from '../EmpTextInput/EmpTextInput'
import EmpDropdown from '../EmpDropdown/EmpDropdown'
import { startCase } from 'lodash'

class EmpItemEditorField extends Component {

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

  handleChange = rawValue => {
    const newValue = {
      ...this.props.value,
      value: rawValue
    }
    const isAddingAll = Array.isArray(newValue.value) && newValue.value.includes('addAllItems')
    const valueToSet = isAddingAll ? {
      ...this.props.value,
      value: this.props.value.options.map(({ value }) => value)
    } : newValue

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
            value={this.selectedValue}
            options={this.optionsWithAddAll}
            className={input}
            onSelect={this.handleChange}
          />
        ) : (
          <EmpTextInput
            className={input}
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
