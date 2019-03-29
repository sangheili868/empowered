import React, { Component } from 'react'
import { map, startCase } from 'lodash'
import { bio, table, cell, field } from './CharacterSheetTable.module.scss'
import bioFields from '../../../../gameData/bioFields.json'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'

class CharacterSheetBio extends Component {

  calcDetails = (details, name) => {
    const isTruncating = name === 'portrait' && details && details.length > 50
    const truncatedDetails = details.slice(0, 50) + '...'
    const defaultDetails = details
    return isTruncating ? truncatedDetails : defaultDetails
  }

  handleSave = (name, value) => {
    return this.props.updateCharacter(['bio', name], value.details)
  }

  render () {
    return (
      <table className={[bio, table].join(' ')}>
        <tbody>
          {map(this.props.bio, (details, name) =>
            <EmpItemEditor
              key={name}
              title={'Edit ' + startCase(name)}
              mode="tr"
              description={bioFields[name]}
              fields={{ details: details || '' }}
              onSave={this.handleSave.bind(this, name)}
            >
              <td className={[cell, field].join(' ')}>{startCase(name)}</td>
              <td className={cell}>{this.calcDetails(details, name)}</td>
            </EmpItemEditor>
          )}
        </tbody>
      </table>
    )
  }
}

export default CharacterSheetBio
