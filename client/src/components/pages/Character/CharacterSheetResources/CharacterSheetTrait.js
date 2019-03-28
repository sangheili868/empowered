import React, { Component } from 'react'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import { pick, startCase } from 'lodash'
import CharacterSheetResource from './CharacterSheetResource'

class CharacterSheetTrait extends Component {

  get editorMode () {
    return this.props.hasFeatures ? 'primary' : ''
  }

  handleSave = values => {
    console.log(values, this.props.trait)
    return this.props.onUpdate(['stats', this.props.trait], values)
  }

  render () {
    return (
      <CharacterSheetResource {...pick(this.props, ['value', 'icon'])} title={startCase(this.props.trait)}>
        <EmpItemEditor
          title={'Edit ' + startCase(this.props.trait)}
          mode={this.editorMode}
          fields={this.props.fields}
          description={this.props.description}
          onSave={this.handleSave}
        >
          {this.props.subtext}
        </EmpItemEditor>
      </CharacterSheetResource>
    )
  }
}

export default CharacterSheetTrait
