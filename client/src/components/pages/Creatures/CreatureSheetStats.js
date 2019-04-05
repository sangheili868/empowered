import React, { Component } from 'react'
import CreatureTraits from './CreatureTraits/CreatureTraits'
import { stats } from './CreaturesPage.module.scss'

class CreatureSheetStats extends Component {
  render () {
    return (
      <div className={stats}>
        <CreatureTraits stats={this.props.stats} updateCreature={this.props.updateCreature}/>
      </div>
    )
  }
}

export default CreatureSheetStats
