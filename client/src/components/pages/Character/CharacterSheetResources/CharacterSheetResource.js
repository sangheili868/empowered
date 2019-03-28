import React, { Component } from 'react'
import {
  info,
  resource,
  valueRow,
  counter,
  minus,
  hidden,
  inverted,
  subtext
} from "./CharacterSheetResources.module.scss"
import { plus } from '../CharacterPage.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EmpCard from '../../../EmpCard/EmpCard'

class CharacterSheetResource extends Component {

  counterClasses = (type, isShowing) => {
    return [
      counter,
      type,
      ...(isShowing ? [] : [hidden]),
      ...(this.props.isInvertingControls ? [inverted] : [])
    ].join (' ')
  }

  get plusClasses () {
    return this.counterClasses(plus, !this.props.max || (this.props.value < this.props.max))
  }

  handleIncrement = () => {
    this.props.onUpdate(parseInt(this.props.value) + 1)
  }

  get minusClasses () {
    return this.counterClasses(minus, this.props.value > 0 || this.props.isAlwaysShowingMinus)
  }

  handleDecrement = () => {
    this.props.onUpdate(parseInt(this.props.value) - 1)
  }

  get renderPlus () {
    return this.props.onUpdate &&
      <FontAwesomeIcon className={this.plusClasses} onClick={this.handleIncrement} icon="plus-square"/>
  }

  get renderMinus () {
    return this.props.onUpdate &&
      <FontAwesomeIcon className={this.minusClasses} onClick={this.handleDecrement} icon="minus-square"/>
  }

  render () {
    return (
      <EmpCard isLocked title={this.props.title}>
       <div className={info}>
         <div className={valueRow}>
            {this.props.isInvertingControls ? this.renderPlus : this.renderMinus}
            <div className={resource} style={{ backgroundImage: `url(${this.props.icon})` }}>
              {this.props.value}
            </div>
            {this.props.isInvertingControls ? this.renderMinus : this.renderPlus}
          </div>
          <div className={subtext}>{this.props.children}</div>
        </div>
      </EmpCard>
    )
  }
}

export default CharacterSheetResource
