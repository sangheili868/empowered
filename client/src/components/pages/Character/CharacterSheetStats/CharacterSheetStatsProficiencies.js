import React, { Component } from 'react'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import CharacterSheetList from '../CharacterSheetList/CharacterSheetList'
import { detailTitle } from '../CharacterPage.module.scss'

class CharacterSheetStatsProficiencies extends Component {

  handleSave = (columnName, index, values) => {
    this.props.updateCharacter(`stats.proficiencies.${columnName}.${index}`, values)
  }

  renderEdit = (columnName, item, index) => {
    const hasFeatures = item.features && item.features.length > 0
    const features = hasFeatures && item.features.map(({ name }) => name).join(', ')
    const fields = columnName === 'languages' ? ({
      name: {
        value: this.props.proficiencies[columnName][index].name
      }
    }) : {}
    return (
      <EmpItemEditor
        key={index}
        isInline
        mode={hasFeatures ? 'primary' : ''}
        title={item.name}
        description={
          <>
            <div>{item.description}</div>
            {hasFeatures &&
              <>
                <div className={detailTitle}>Features Related to {item.name}</div>
                <div>{features}</div>
              </>
            }
          </>
        }
        fields={fields}
        onSave={this.handleSave.bind(this, columnName, index)}
      >
        {item.name}
      </EmpItemEditor>
    )
  }

  render () {
    return (
      <CharacterSheetList title="Proficiencies" items={this.props.proficiencies} editItem={this.renderEdit}/>
    )
  }
}

export default CharacterSheetStatsProficiencies
