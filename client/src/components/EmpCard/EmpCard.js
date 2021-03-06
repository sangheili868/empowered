import React, { Component } from 'react'
import { card, title, locked, spacer, caret, hidden, noSpacing } from './EmpCard.module.scss'
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

  get cardClasses () {
    return [
      card,
      this.props.className,
      ...(this.props.noSpacing ? [noSpacing] : [])
    ].join(' ')
  }

  get titleClasses () {
    return [
      title,
      ...(this.props.noSpacing ? [noSpacing] : []),
      (this.props.isLocked ? locked : '')
    ].join(' ')
  }

  get contentClasses () {
    return [
      this.props.contentClassName,
      ...(this.state.isOpen ? [] : [hidden])
    ].join(' ')
  }

  render () {
    return (
      <div className={this.cardClasses}>
        <EmpButton
          className={this.titleClasses}
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
        <div className={this.contentClasses}>{this.props.children}</div>
      </div>
    )
  }
}

export default EmpCard
