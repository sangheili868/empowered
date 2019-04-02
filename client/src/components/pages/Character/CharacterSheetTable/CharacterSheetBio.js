import React, { Component } from 'react'
import { chain, startCase } from 'lodash'
import { bio, table, cell, field } from './CharacterSheetTable.module.scss'
import bioFields from '../../../../gameData/bioFields.json'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import CharacterSheetBioCustom from './CharacterSheetBioCustom'

class CharacterSheetBio extends Component {

  calcDetails = (details, name) => {
    const isTruncating = name === 'portrait' && details && details.length > 50
    const truncatedDetails = details.slice(0, 50) + '...'
    return isTruncating ? truncatedDetails : details
  }

  handleSave = (name, value) => {
    return this.props.updateCharacter(`bio.${name}`, value.details)
  }

  getFields = (name, details) => {
    const validation = name === 'name' ? {} : {
      validation: 'none'
    }

    return {
      details: {
        value: details || '',
        ...validation,
        isAllowingNewLines: true
      }
    }
  }

  render () {
    return (
      <>
        <table className={[bio, table].join(' ')}>
          <tbody>
            {chain(this.props.bio).omit('customs').map((details, name) =>
              <EmpItemEditor
                key={name}
                title={'Edit ' + startCase(name)}
                mode="tr"
                description={bioFields[name]}
                fields={this.getFields(name, details)}
                onSave={this.handleSave.bind(this, name)}
              >
                <td className={[cell, field].join(' ')}>{startCase(name)}</td>
                <td className={cell}>{this.calcDetails(details, name)}</td>
              </EmpItemEditor>
            ).value()}
          </tbody>
        </table>
        <CharacterSheetBioCustom
          bios={this.props.bio.customs || []}
          updateCharacter={this.props.updateCharacter}
        />
      </>
    )
  }
}

export default CharacterSheetBio
