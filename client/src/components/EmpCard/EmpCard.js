import React, { Component } from 'react'
import { card, title, spacer, caret } from './EmpCard.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EmpButton from '../EmpButton/EmpButton'

class EmpCard extends Component {
  state = {
    isOpen: this.props.isStartingOpen
  }
  handleToggle = () => {
    this.setState(prevState => ({
      ...prevState,
      isOpen: !prevState.isOpen
    }))
  }
  render () {
    return (
      <div className={[card, this.props.className].join(' ')}>
        <EmpButton className={title} onClick={this.handleToggle}>
          <div className={spacer}></div>
          {this.props.title}
          <FontAwesomeIcon className={caret} icon={this.state.isOpen ? 'caret-down' : 'caret-up'}/>
        </EmpButton>
        {this.state.isOpen && this.props.children}
      </div>
    )
  }
}

export default EmpCard