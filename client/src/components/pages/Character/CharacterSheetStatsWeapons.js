import React, { Component } from 'react'
import { upperFirst } from 'lodash'
import {
  section,
  title,
  table,
  column,
  data
} from "./CharacterPage.module.scss"

class CharacterSheetStatsWeapons extends Component {
  render () {
    return (
      <div className={section}>
        <div className={title}>Weapons</div>
        <br/>
        <div className={table}>
          <div className={column}>
            <div>Name</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index} className={data}>{weapon.name}</div>
            )}
          </div>
          <div className={column}>
            <div>Hit Bonus</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index} className={data}>{weapon.bonus}</div>
            )}
          </div>
          <div className={column}>
            <div>Damage</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index} className={data}>{weapon.damage}</div>
            )}
          </div>
          <div className={column}>
            <div>Range</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index} className={data}>{weapon.range}ft.</div>
            )}
          </div>
          <div className={column}>
            <div>Notes</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index} className={data}>
              {weapon.tags.map(tag =>
                upperFirst(tag)
              ).join(', ')}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default CharacterSheetStatsWeapons