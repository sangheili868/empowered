import React, { Component } from 'react'
import {
  info,
  resource,
  valueRow,
  counter,
  hidden,
  subtext
} from "./CharacterSheetResources.module.scss"
import EmpCard from '../../../EmpCard/EmpCard'
import EmpIconButton from '../../../EmpIconButton/EmpIconButton'

class CharacterSheetResource extends Component {

  handleIncrement = () => {
    this.props.onUpdate(parseInt(this.props.value) + 1, 1)
  }

  handleDecrement = () => {
    this.props.onUpdate(parseInt(this.props.value) - 1, -1)
  }

  get renderPlus () {
    const isHidden = this.props.max && (this.props.value >= this.props.max)
    const classes = isHidden ? [counter, hidden].join(' ') : counter
    const color = this.props.isInvertingControls ? 'warning' : 'success'
    return this.props.onUpdate &&
      <EmpIconButton className={classes} color={color} icon="plus" onClick={this.handleIncrement}/>
  }

  get renderMinus () {
    const isHidden = (this.props.value <= 0) && !this.props.isAlwaysShowingMinus
    const classes = isHidden ? [counter, hidden].join(' ') : counter
    const color = this.props.isInvertingControls ? 'success' : 'warning'
    return this.props.onUpdate &&
      <EmpIconButton className={classes} color={color} icon="minus" onClick={this.handleDecrement}/>
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
