import React, { Component } from 'react'
import { map, startCase } from 'lodash'
import { bio, bioTable, row, cell, description } from './CharacterPage.module.scss'

class CharacterSheetBio extends Component {
  render () {
    return (
      <div className={bio}>
        <table className={bioTable}>
          <tbody>
            {map(this.props.bio, (value, characteristic) => 
              <tr className={row} key={characteristic}>
                <td className={cell}>{startCase(characteristic)}</td>
                <td className={[cell, description].join(' ')}>{value}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default CharacterSheetBio