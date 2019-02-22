import React, { Component } from 'react'
import { upperFirst } from 'lodash'
import {
  section,
  title,
  table,
  column,
  columnHeader
} from "./CharacterPage.module.scss"

class CharacterSheetStatsWeapons extends Component {
  render () {
    return (
      <div className={section}>
        <div className={title}>Weapons</div>
        <br/>
        <div className={table}>
          <div className={column}>
            <div className={columnHeader}>Name</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index}>{weapon.name}</div>
            )}
          </div>
          <div className={column}>
            <div className={columnHeader}>Hit Bonus</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index}>{weapon.bonus}</div>
            )}
          </div>
          <div className={column}>
            <div className={columnHeader}>Damage</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index}>{weapon.damage}</div>
            )}
          </div>
          <div className={column}>
            <div className={columnHeader}>Range</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index}>{weapon.range}ft.</div>
            )}
          </div>
          <div className={column}>
            <div className={columnHeader}>Notes</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index}>
              {weapon.tags && weapon.tags.map(tag =>
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