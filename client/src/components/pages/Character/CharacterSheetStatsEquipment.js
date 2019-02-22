import React, { Component } from 'react'
import {
  section,
  title,
  subtitle,
  table,
  column,
  data
} from "./CharacterPage.module.scss"

class CharacterSheetStatsEquipment extends Component {
  render () {
    return (
      <div className={section}>
        <div className={title}>Equipment</div>
        <div className={subtitle}>
          <div>Gold: {this.props.equipment.gold}</div>
          <div>
            Carried Weight: {this.props.equipment.encumberance.current.toFixed(2)}
            / {this.props.equipment.encumberance.limit.toFixed(2)}
          </div>
        </div>
        <div className={table}>
          <div className={column}>
            <div>Heavy</div>
            {this.props.equipment.heavy.map((equipment, index) =>
              <div key={index} className={data}>{equipment}</div>
            )}
          </div>
          <div className={column}>
            <div>Medium</div>
            {this.props.equipment.medium.map((equipment, index) =>
              <div key={index} className={data}>{equipment}</div>
            )}
          </div>
          <div className={column}>
            <div>Light</div>
            {this.props.equipment.light.map((equipment, index) =>
              <div key={index} className={data}>{equipment.name} ({equipment.quantity})</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default CharacterSheetStatsEquipment