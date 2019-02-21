import React, { Component } from 'react'
import { upperFirst } from 'lodash'
import {
  weaponsList,
  weaponsTitle,
  weaponsTable,
  weaponColumn,
  weaponData
} from "./CharacterSheetStatsWeapons.module.scss"

class CharacterSheetStatsWeapons extends Component {
  render () {
    return (
      <div className={weaponsList}>
        <div className={weaponsTitle}>Weapons</div>
        <br/>
        <div className={weaponsTable}>
          <div className={weaponColumn}>
            <div>Name</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index} className={weaponData}>{weapon.name}</div>
            )}
          </div>
          <div className={weaponColumn}>
            <div>Hit Bonus</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index} className={weaponData}>{weapon.bonus}</div>
            )}
          </div>
          <div className={weaponColumn}>
            <div>Damage</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index} className={weaponData}>{weapon.damage}</div>
            )}
          </div>
          <div className={weaponColumn}>
            <div>Range</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index} className={weaponData}>{weapon.range}ft.</div>
            )}
          </div>
          <div className={weaponColumn}>
            <div>Notes</div>
            {this.props.weapons.map((weapon, index) =>
              <div key={index} className={weaponData}>
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