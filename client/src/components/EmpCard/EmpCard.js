import React, { Component } from 'react'
import { card, title, spacer, caret, hidden } from './EmpCard.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EmpButton from '../EmpButton/EmpButton'

class EmpCard extends Component {
  state = {
    isOpen: false
  }
  componentDidMount () {
    this.setState({ isOpen: this.props.isStartingOpen || this.props.isLocked })
  }
  handleToggle = () => {
    if (!this.props.isLocked) {
      this.setState(prevState => ({
        ...prevState,
        isOpen: !prevState.isOpen
      }))
    }
  }
  render () {
    return (
      <div className={[card, this.props.className].join(' ')}>
        <EmpButton className={title} onClick={this.handleToggle}>
          <div className={spacer}></div>
          {this.props.title}
          {this.props.isLocked ? (
            <div className={spacer}></div>
          ) : (
            <FontAwesomeIcon className={caret} icon={this.state.isOpen ? 'caret-down' : 'caret-up'}/>
          )}
        </EmpButton>
        <div className={[this.props.contentClassName, ...(this.state.isOpen ? [] : [hidden])].join(' ')}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default EmpCard
