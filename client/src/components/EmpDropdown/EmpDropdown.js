import React, { Component } from 'react'
import { Dropdown } from 'react-bootstrap'
import { dropdown } from './EmpDropdown.module.scss'

class EmpDropdown extends Component {
  render () {
    return (
      <Dropdown>
        <Dropdown.Toggle>{this.props.title}</Dropdown.Toggle>
        <Dropdown.Menu className={dropdown}>
          {this.props.items.map(({ text, value }) => 
          <Dropdown.Item key={value} onClick={this.props.onSelect.bind(this,value)}>
            {text}
          </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

export default EmpDropdown