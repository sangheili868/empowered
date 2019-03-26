import React, { Component } from 'react'
import { card, title, locked, spacer, caret, hidden } from './EmpCard.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EmpButton from '../EmpButton/EmpButton'

class EmpCard extends Component {
  state = {
    isOpen: this.props.isStartingOpen || this.props.isLocked
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
        <EmpButton
          className={[title, (this.props.isLocked ? locked : '')].join(' ')}
          mode={this.props.mode || 'secondary'}
          onClick={this.handleToggle}
        >
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
