import React, { Component } from 'react'
import {
  resource,
  title,
  info,
  valueRow,
  counter,
  plus,
  minus,
  hidden,
  icon,
  subtext
} from "./CharacterPage.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CharacterSheetResource extends Component {
  handleIncrement = () => {
    this.props.onUpdate(parseInt(this.props.value) + 1)
  }
  handleDecrement = () => {
    this.props.onUpdate(parseInt(this.props.value) - 1)
  }
  counterClasses = (type, isShowing) => {
    return [
      counter,
      type,
      ...(isShowing ? [] : [hidden])
    ].join (' ')
  }
  render () {
    return (
      <div className={resource}>
        <div className={title}>{this.props.title}</div>
        <div className={info}>
          <div className={valueRow}>
            <FontAwesomeIcon
              className={this.counterClasses(minus, this.props.value > 0)}
              onClick={this.handleDecrement}
              icon="minus-square"
            />
            <div>{this.props.value}</div>
            <FontAwesomeIcon
              className={this.counterClasses(plus, !this.props.max || (this.props.value < this.props.max))}
              onClick={this.handleIncrement}
              icon="plus-square"
            />
          </div>
          <img className={icon} alt={this.props.alt} src={this.props.icon}/>
          {this.props.max &&
            <div className={subtext}>Max: {this.props.max}</div>
          }
        </div>
      </div>
    )
  }
}

export default CharacterSheetResource