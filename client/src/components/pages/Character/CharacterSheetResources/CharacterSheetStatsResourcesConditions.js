import React, { Component } from 'react'
import conditionData from '../../../../gameData/conditions.json'
import withoutIndex from '../../../../utils/withoutIndex'
import { plus } from '../CharacterPage.module.scss'
import { chain } from 'lodash'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import CharacterSheetStatsList from '../CharacterSheetList/CharacterSheetList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CharacterSheetStatsResourcesConditions extends Component {

  get inactiveConditions() {
    return Object.keys(conditionData)
      .filter(condition => !chain(this.props.conditions).map('name').includes(condition).value())
      .map(condition => ({ label: condition, value: condition}))
  }

  conditionDescription = ({ name }) => {
    return name && name.value && conditionData[name.value].description
  }

  handleDelete = index => {
    this.props.updateCharacter('stats.conditions', withoutIndex(this.props.conditions, index))
  }

  handleSave = values => {
    return this.props.updateCharacter('stats.conditions', [
      ...this.props.conditions,
      values
    ])
  }

  render () {
    return (
      <CharacterSheetStatsList
        title="Conditions"
        items={this.props.conditions}
        editItem={(item, index) =>
          <EmpItemEditor
            key={index}
            isInline
            mode="warning"
            title={item.name}
            onDelete={this.handleDelete.bind(this, index)}
            description={item.description}
          >
            {item.name}
          </EmpItemEditor>
        }
        addToList={() => (this.inactiveConditions.length > 0) &&
          <EmpItemEditor
            title="Add a Condition"
            fields={{ name: {
              value: '',
              default: '',
              options: this.inactiveConditions
            }}}
            description={this.conditionDescription}
            mode="noStyle"
            onSave={this.handleSave}
          >
            <FontAwesomeIcon className={plus} icon={'plus-square'}/>
          </EmpItemEditor>
        }
      />
    )
  }
}

export default CharacterSheetStatsResourcesConditions
