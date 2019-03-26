import React, { Component } from 'react'
import Select from 'react-select'

class EmpDropdown extends Component {

  handleChange = values => {
    return this.props.onSelect(this.props.isMulti ? values.map(({value}) => value) : values.value)
  }

  render () {
    return (
      <Select {...this.props} onChange={this.handleChange}/>
    )
  }
}

export default EmpDropdown
