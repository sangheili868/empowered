import React, { Component } from 'react'
import { cardTable, cell } from "./RulesPage.module.scss"
import { map } from 'lodash'
import conditions from '../../../gameData/conditions.json'

class RulesConditions extends Component {
  render () {
    return (
      <table className={cardTable}>
        <thead>
          <tr>
            <th className={cell}>Conditon</th>
            <th className={cell}>Effects</th>
            <th className={cell}>Action</th>
            <th className={cell}>Action Description</th>
          </tr>
        </thead>
        <tbody>
          {map(conditions, ({ name, description, action }) =>
            <tr key={name}>
              <td className={cell}>{name}</td>
              <td className={cell}>{description}</td>
              <td className={cell}>{action ? action.name : 'None'}</td>
              <td className={cell}>{action ? action.description : 'None'}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default RulesConditions
