import React, { Component } from 'react'
import {
  info,
  resource,
  valueRow,
  counter,
  minus,
  hidden,
  subtext
} from "./CharacterSheetResources.module.scss"
import { plus } from '../CharacterPage.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EmpCard from '../../../EmpCard/EmpCard'

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
      <EmpCard isLocked title={this.props.title}>
       <div className={info}>
         <div className={valueRow}>
            {this.props.onUpdate &&
              <FontAwesomeIcon
                className={this.counterClasses(minus, this.props.value > 0 || this.props.isAlwaysShowingMinus)}
                onClick={this.handleDecrement}
                icon="minus-square"
              />
            }
            <div className={resource} style={{ backgroundImage: `url(${this.props.icon})` }}>
              {this.props.value}
            </div>
            {this.props.onUpdate &&
              <FontAwesomeIcon
                className={this.counterClasses(plus, !this.props.max || (this.props.value < this.props.max))}
                onClick={this.handleIncrement}
                icon="plus-square"
              />
            }
          </div>
          <div className={subtext}>{this.props.children}</div>
        </div>
      </EmpCard>

    )
  }
}

export default CharacterSheetResource
