import React, { Component } from 'react'
import { bouncer, dot, bouncer1, bouncer2, bouncer3 } from './EmpLoadingDots.module.scss'

class EmpLoadingDots extends Component {
  render () {
    return (
      <div className={bouncer}>
        <div className={[dot, bouncer1].join(' ')}></div>
        <div className={[dot, bouncer2].join(' ')}></div>
        <div className={[dot, bouncer3].join(' ')}></div>
      </div>
    )
  }
}

export default EmpLoadingDots
