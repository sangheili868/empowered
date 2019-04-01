import React, { Component } from 'react'
import { input, field, fieldLabel } from './EmpItemEditor.module.scss'
import EmpTextInput from '../EmpTextInput/EmpTextInput'
import EmpDropdown from '../EmpDropdown/EmpDropdown'
import { startCase, isObject } from 'lodash'

class EmpItemEditorField extends Component {

  selectedValue = ({ value, options }) => {
    return options.filter(option => Array.isArray(value) ? value.includes(option.value) : value === option.value)
  }

  optionsWithAddAll = value => {
    const isAllSelected = value.options.filter(option => !value.value.includes(option.value)).length === 0
    const isShowingAddAll = Array.isArray(value.default) && !isAllSelected
    return [
      ...(isShowingAddAll ? [{ label: 'Add all', value: 'addAllItems' }] : []),
      ...value.options
    ]
  }

  handleChange = rawValue => {
    const newValue = this.props.value.options ? {
      ...this.props.value,
      value: rawValue
    } : rawValue
    const isAddingAll = Array.isArray(newValue.value) && newValue.value.includes('addAllItems')
    const valueToSet = isAddingAll ? {
      ...this.props.value,
      value: this.props.value.options.map(({ value }) => value)
    } : newValue

    this.props.onChange({ [this.props.fieldName]: valueToSet })
  }

  handleKeyPress = ({key}) => {
    if (key === 'Enter') this.props.onClose()
  }

  render () {
    return (
      <div className={field}>
        <div className={fieldLabel}>{startCase(this.props.fieldName)}</div>
        {this.props.value && this.props.value.options ? (
          <EmpDropdown
            isMulti={Array.isArray(this.props.value.default)}
            value={this.selectedValue(this.props.value)}
            options={this.optionsWithAddAll(this.props.value)}
            className={input}
            onSelect={this.handleChange}
          />
        ) : (
          <EmpTextInput
            className={input}
            value={isObject(this.props.value) ? this.props.value.value : this.props.value}
            onChange={({target}) => this.handleChange(target.value)}
            onKeyPress={this.handleKeyPress}
          />
        )}
      </div>
    )
  }
}

export default EmpItemEditorField
