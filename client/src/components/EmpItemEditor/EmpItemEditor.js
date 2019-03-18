import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  input,
  button,
  plus,
  pen,
  inline,
  field,
  fieldLabel
} from './EmpItemEditor.module.scss'
import EmpTextInput from '../EmpTextInput/EmpTextInput'
import EmpDropdown from '../EmpDropdown/EmpDropdown'
import EmpModal from '../EmpModal/EmpModal'
import { cloneDeep, startCase, mapValues, isObject, isEmpty, isFunction } from 'lodash'

class EmpItemEditor extends Component {
  state = {
    workingValues: {}
  }
  handleOpen = () => {
    this.setState({
      workingValues: cloneDeep(this.props.fields)
    })
  }
  handleChange = (key, {target}) => {
    const fieldData = this.state.workingValues[key]
    const newValue = fieldData.options ? {
      ...fieldData,
      value: target.value
    } : target.value
    const isAddingAll = Array.isArray(target.value) && target.value.includes('addAllItems')
    const valueToSet = isAddingAll ? {
      ...fieldData,
      value: fieldData.options.map(({ value }) => value)
    }: newValue
    this.setState(prevState => ({
      ...prevState,
      workingValues: {
        ...prevState.workingValues,
        [key]: valueToSet
      }
    }))
  }
  optionsWithAddAll = (value) => {
    const isAllSelected = value.options.filter(option => !value.value.includes(option.value)).length === 0
    const isShowingAddAll = Array.isArray(value.default) && !isAllSelected
    return [
      ...(isShowingAddAll ? [{ label: 'Add all', value: 'addAllItems' }] : []),
      ...value.options
    ]
  }
  handleDone = () => {
    this.props.onSave(mapValues(this.state.workingValues, value => isObject(value) ? value.value : value))
  }
  handleKeyPress = ({key}) => {
    if (key === 'Enter') {
      this.toggleModal()
      this.handleDone()
    }
  }
  render () {
    return (
      <EmpModal
        backdrop="static"
        title={this.props.title}
        noStyle={!this.props.isInline || this.props.isCustomInline}
        className={this.props.isInline ? inline : ''}
        body={
          <>
            {this.props.fields && Object.keys(this.props.fields).map(key => {
              const value = this.state.workingValues[key]
              return value && (
                <div className={field} key={key}>
                  <div className={fieldLabel}>{startCase(key)}</div>
                  {value.options ? (
                    <EmpDropdown
                      isMulti={Array.isArray(value.default)}
                      value={value.options.filter(option => value.value.includes(option.value))}
                      options={this.optionsWithAddAll(value)}
                      className={input}
                      onSelect={newValue => this.handleChange(key, {target: { value: newValue}})}
                    />
                  ) : (
                    <EmpTextInput
                      className={input}
                      value={isObject(value) ? value.value : value}
                      onChange={this.handleChange.bind(this, key)}
                      onKeyPress={this.handleKeyPress}
                    />
                  )}
                </div>
              )
            })}
            {this.props.description &&
              <div>
                {isFunction(this.props.description) ? (
                  this.props.description(this.state.workingValues)
                ) : (
                  this.props.description
                )}
              </div>
            }
          </>
        }
        controls={[
          {
            label: 'Delete',
            isHidden: !this.props.onDelete,
            onClick: this.props.onDelete
          },
          {
            label: 'Save',
            isHidden: isEmpty(this.state.workingValues),
            onClick: this.handleDone
          }
        ]}
        onOpen={this.handleOpen}
        setToggler={toggler => this.toggleModal = toggler}
      >
        {this.props.children}
        {!this.props.isInline && !this.props.isCustomInline &&
          <FontAwesomeIcon
            className={[button, (this.props.isEdit ? pen : plus)].join(' ')}
            icon={this.props.isEdit ? 'pen-square' : 'plus-square'}
          />
        }
      </EmpModal>
    )
  }
}

export default EmpItemEditor
