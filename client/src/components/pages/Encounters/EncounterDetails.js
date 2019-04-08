import React, { Component } from 'react'
import { header, nameAndBio, name, bio, table, cell, tableField } from '../Creatures/CreaturesPage.module.scss'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import { chain, startCase } from 'lodash'
import EncounterList from './EncounterList/EncounterList'

class CreatureSheet extends Component {

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

  handleSave = (field, value) => {
    return this.props.updateEncounter(field, value.details)
  }

  calcDetails = (details, name) => {
    const isTruncating = name === 'portrait' && details && details.length > 50
    const truncatedDetails = details.slice(0, 50) + '...'
    return isTruncating ? truncatedDetails : details
  }

  render () {
    return (
      <>
        <div className={header}>
          <div className={nameAndBio}>
            <div className={name}>{this.props.encounter.name || 'Unnamed Encounter'}</div>
            <table className={[bio, table].join(' ')}>
              <tbody>
                {chain(this.props.encounter).pick(['name', 'description']).map((details, field) =>
                  <EmpItemEditor
                    key={field}
                    title={'Edit ' + startCase(field)}
                    mode="tr"
                    fields={this.getFields(field, details)}
                    onSave={this.handleSave.bind(this, field)}
                  >
                    <td className={[cell, tableField].join(' ')}>{startCase(field)}</td>
                    <td className={cell}>{this.calcDetails(details, field)}</td>
                  </EmpItemEditor>
                ).value()}
              </tbody>
            </table>
          </div>
        </div>
        <EncounterList
          combatants={this.props.encounter.combatants}
          updateEncounter={this.props.updateEncounter}
        />
      </>
    )
  }
}

export default CreatureSheet
