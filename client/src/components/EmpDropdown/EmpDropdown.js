import React, { Component } from 'react'
import Select from 'react-select'
import { lightblue, blue, red } from '../../styles/colors.js'

class EmpDropdown extends Component {

  theme = theme => {
    return this.props.isInvalid ? {
      ...theme,
      colors: {
        ...theme.colors,
        primary: red,
        primary25: lightblue,
        neutral20: red,
        neutral60: red
      }
    } : {
      ...theme,
      colors: {
        ...theme.colors,
        primary: blue,
        primary25: lightblue
      }
    }
  }

  handleChange = values => {
    return this.props.onSelect(values && (this.props.isMulti ? values.map(({value}) => value) : values.value))
  }

  render () {
    return (
      <Select {...this.props} theme={this.theme} onChange={this.handleChange}/>
    )
  }
}

export default EmpDropdown
