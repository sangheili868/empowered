import React, { Component } from 'react'
import { header, nameAndBio, name, portrait, bio, table, cell, tableField } from './CreaturesPage.module.scss'
import EmpItemEditor from '../../EmpItemEditor/EmpItemEditor'
import { map, startCase } from 'lodash'
import CreatureSheetStats from './CreatureSheetStats/CreatureSheetStats'
import EmpButton from '../../EmpButton/EmpButton';

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
    const path = (field === 'name') ? 'name' : `bio.${field}`
    return this.props.updateCreature(path, value.details)
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
            <div className={name}>{this.props.creature.name || 'Unnamed Creature'}</div>
            <table className={[bio, table].join(' ')}>
              <tbody>
                {map({
                  name: this.props.creature.name,
                  ...this.props.creature.bio
                }, (details, field) =>
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
                )}
              </tbody>
            </table>
          </div>
          <div>
            {this.props.creature.bio.portrait &&
              <img
                alt='Failed to load creature portrait'
                src={this.props.creature.bio.portrait}
                className={portrait}
              />
            }
          </div>
        </div>
        <CreatureSheetStats
          stats={this.props.creature.stats}
          updateCreature={this.props.updateCreature}
        />
        <EmpButton mode="warning" onClick={this.props.onDelete}>Delete Creature</EmpButton>
      </>
    )
  }
}

export default CreatureSheet
