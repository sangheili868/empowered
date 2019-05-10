import React, { Component } from 'react'
import CharacterSheetList from '../CharacterSheetList/CharacterSheetList'
import { detailTitle } from '../CharacterPage.module.scss'
import EmpActionTracker from '../../../EmpActionTracker/EmpActionTracker'
class CharacterSheetStatsCombat extends Component {

  renderTooltipBody = item => {
    const hasFeatures = item.features && item.features.length > 0
    const features = hasFeatures && item.features.map(({ name }) => name).join(', ')
    const hasConditions = item.conditions && item.conditions.length > 0
    const conditions = hasConditions && item.conditions.map(({ name }) => name).join(', ')
    return (
      <>
        <div>{item.description}</div>
        {hasFeatures &&
          <>
            <div className={detailTitle}>Features Related to {item.name}</div>
            <div>{features}</div>
          </>
        }

        {hasConditions &&
          <>
            <div className={detailTitle}>Conditions Affecting {item.name}</div>
            <div>{conditions}</div>
          </>
        }
      </>
    )
  }

  render () {
    return (
      <CharacterSheetList
        title="Combat"
        subtitles={[<EmpActionTracker key="actionTracker"/>]}
        items={this.props.actions}
        tooltips={{
          mode: ({ mode }) => mode || '',
          title: ({ name }) => name,
          body: this.renderTooltipBody
        }}
      />
    )
  }
}

export default CharacterSheetStatsCombat
