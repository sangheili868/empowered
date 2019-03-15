import React, { Component } from 'react'
import Select from 'react-select'

class EmpDropdown extends Component {
  render () {
    return (
      <Select
        isMulti={this.props.isMulti}
        options={this.props.options}
        value={this.props.value}
        className={this.props.className}
        onChange={values => this.props.onSelect(this.props.isMulti ? values.map(({value}) => value) : values.value)}
      />
    )
  }
}

export default EmpDropdown
