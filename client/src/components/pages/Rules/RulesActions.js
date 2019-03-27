import React, { Component } from 'react'
import { nestedCard, cardTable, cell } from "./RulesPage.module.scss"
import EmpCard from '../../EmpCard/EmpCard'
import { startCase, map } from 'lodash'
import actions from '../../../gameData/actions.json'

class RulesActions extends Component {
  render () {
    return (
      <>
        {map(actions, (actionList, category) =>
          <EmpCard key={category} title={startCase(category)} className={nestedCard} noSpacing>
            <table className={cardTable}>
              <tbody>
                {actionList.map(({ name, description }) =>
                  <tr key={name}><td className={cell}>{name}</td><td className={cell}>{description}</td></tr>
                )}
              </tbody>
            </table>
          </EmpCard>
        )}
      </>
    )
  }
}

export default RulesActions
