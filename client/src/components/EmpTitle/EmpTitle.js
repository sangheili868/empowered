import React, { Component } from 'react'
import { title, name, die } from './EmpTitle.module.scss'

import d4Icon from "../../icons/d4.png"
import d6Icon from "../../icons/d6.png"
import d8Icon from "../../icons/d8.png"
import d10Icon from "../../icons/d10.png"
import d12Icon from "../../icons/d12.png"
import d20Icon from "../../icons/d20.png"

class EmpTitle extends Component {

  get leftIcons () {
    return [d4Icon, d6Icon, d8Icon]
  }

  get rightIcons () {
    return [d10Icon, d12Icon, d20Icon]
  }

  render () {
    return (
      <div className={title}>
        {this.leftIcons.map(icon =>
          <img key={icon} src={icon} className={die} alt=""/>
        )}
        <div className={name}>Empowered RPG System</div>
        {this.rightIcons.map(icon =>
          <img key={icon} src={icon} className={die} alt=""/>
        )}
      </div>
    )
  }
}

export default EmpTitle
