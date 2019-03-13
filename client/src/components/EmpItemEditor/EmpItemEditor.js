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
import { cloneDeep, startCase, map, merge, mapValues, isObject, isEmpty, isFunction } from 'lodash'

class EmpItemEditor extends Component {
  state = {
    workingValues: {}
  }
  toggleEditing = () => {
    this.setState({
      workingValues: cloneDeep(this.props.fields),
    })
  }
  chooseTitle = (value) => {
    if (value.value && !Array.isArray(value.value)) {
      return value.default.find(item => item.value === value.value).text
    } else {
      return 'Choose one'
    }
  }
  handleChange = (key, {target}) => {
    const newValue = isObject(this.state.workingValues[key].default) ? { value: target.value } : target.value
    this.setState(prevState => merge(prevState, {
      workingValues: { [key]: newValue }
    }))
  }
  handleDone = () => {
    this.props.onUpdate(mapValues(this.state.workingValues, value => isObject(value) ? value.value : value))
  }
  render () {
    return (
      <EmpModal
        backdrop="static"
        noStyle
        title={this.props.title}
        body={
          <>
            {map(this.state.workingValues, (value, key) =>
              <div className={field} key={key}>
                <div className={fieldLabel}>{startCase(key)}</div>
                {Array.isArray(value.default) ? (
                  <EmpDropdown
                    title={this.chooseTitle(value)}
                    items={value.default}
                    onSelect={newValue => this.handleChange(key, {target: { value: newValue}})}
                  />
                ) : (
                  <EmpTextInput
                    type="text"
                    className={input}
                    value={isObject(value) ? value.value : value}
                    onChange={this.handleChange.bind(this, key)}
                  />
                )}
              </div>
            )}
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
      >
        {this.props.isInline || this.props.isCustomInline ? (
          <span className={this.props.isInline ? inline : ''} onClick={this.toggleEditing}>
            {this.props.children}
          </span>
        ) : (
          <FontAwesomeIcon
            className={[button, (this.props.isEdit ? pen : plus)].join(' ')}
            icon={this.props.isEdit ? 'pen-square' : 'plus-square'}
            onClick={this.toggleEditing}
          />
        )}
      </EmpModal>
    )
  }
}

export default EmpItemEditor
