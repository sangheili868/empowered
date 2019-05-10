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
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor';

class CharacterSheetResource extends Component {

  handleIncrement = amount => {
    const increase = parseInt(amount.increaseBy) || 1
    this.props.onUpdate(parseInt(this.props.value) + increase, increase)
  }

  handleDecrement = amount => {
    const reduction = parseInt(amount.decreaseBy) * -1 || -1
    this.props.onUpdate(parseInt(this.props.value) + reduction, reduction)
  }

  get renderPlus () {
    const isHidden = this.props.max && (this.props.value >= this.props.max)
    const classes = isHidden ? [counter, hidden].join(' ') : counter
    const color = this.props.isInvertingControls ? 'warning' : 'success'
    return this.props.onUpdate && (this.props.isInputModal ? (
      <EmpItemEditor
        title={'Increase ' + this.props.title}
        mode="noStyle"
        fields={{ increaseBy: { validation: 'positive' } }}
        onSave={this.handleIncrement}
        saveLabel="CONFIRM"
      >
        <EmpIconButton className={classes} color={color} icon="plus"/>
      </EmpItemEditor>
    ) : (
      <EmpIconButton className={classes} color={color} icon="plus" onClick={this.handleIncrement}/>
    ))
  }

  get renderMinus () {
    const isHidden = (this.props.value <= 0) && !this.props.isAlwaysShowingMinus
    const classes = isHidden ? [counter, hidden].join(' ') : counter
    const color = this.props.isInvertingControls ? 'success' : 'warning'
    return this.props.onUpdate && (this.props.isInputModal ? (
      <EmpItemEditor
        title={'Decrease ' + this.props.title}
        mode="noStyle"
        fields={{ decreaseBy: { validation: 'positive' } }}
        onSave={this.handleDecrement}
        saveLabel="CONFIRM"
      >
        <EmpIconButton className={classes} color={color} icon="minus"/>
      </EmpItemEditor>
    ) : (
      <EmpIconButton className={classes} color={color} icon="minus" onClick={this.handleDecrement}/>
    ))
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
