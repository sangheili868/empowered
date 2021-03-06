import React, { Component } from 'react'
import { table, cell, critical } from "./RulesPage.module.scss"
import criticals from '../../../gameData/criticals.json'
class RulesCriticals extends Component {
  render () {
    return criticals.map(({ type, description, results}) =>
      <React.Fragment key={type}>
        <p>{description}</p>
        <table className={[table, critical].join(' ')}>
          <thead><tr><th className={cell}>d24</th><th className={cell}>{type}</th></tr></thead>
          <tbody>
            {results.map(({range, result}) =>
              <tr key={range}><td className={cell}>{range}</td><td className={cell}>{result}</td></tr>
            )}
          </tbody>
        </table>
      </React.Fragment>
    )
  }
}

export default RulesCriticals
