import React, { Component } from 'react'
import { map, startCase } from 'lodash'
import { box, title, smallFields, control, plus, minus } from './CreatureTraits.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CreatureCounter extends Component {

  handleIncrement = (field, value) => {
    this.props.updateCreature(`${this.props.basePath}.${field}`,value + 1, 1)
  }

  handleDecrement = (field, value) => {
    this.props.updateCreature(`${this.props.basePath}.${field}`,value - 1, -1)
  }

  render () {
    return (
      <div className={box}>
        <div className={title}>{this.props.title}</div>
        <table><tbody>
          {map(this.props.computedFields, (value, field) =>
            <tr key={field}>
              <td className={smallFields}>{startCase(field)}</td>
              <td className={smallFields}>{value}</td>
              <td></td>
              <td></td>
            </tr>
          )}
          {map(this.props.fields, (value, field) =>
            <tr key={field}>
              <td className={smallFields}>{startCase(field)}</td>
              <td className={smallFields}>{value}</td>
              <td>
                <FontAwesomeIcon
                  className={[control, plus].join(' ')}
                  onClick={this.handleIncrement.bind(this, field, value)}
                  icon="plus-square"
                />
              </td>
              <td>
                <FontAwesomeIcon
                  className={[control, minus].join(' ')}
                  onClick={this.handleDecrement.bind(this, field, value)}
                  icon="minus-square"
                />
              </td>
            </tr>
          )}
        </tbody></table>
      </div>
    )
  }
}

export default CreatureCounter
