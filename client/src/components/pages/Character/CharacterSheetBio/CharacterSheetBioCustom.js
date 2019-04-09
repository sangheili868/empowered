import React, { Component } from 'react'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import withoutIndex from '../../../../utils/withoutIndex'
import EmpTableStrings from '../../../EmpTable/EmpTableStrings'
import EmpIconButton from '../../../EmpIconButton/EmpIconButton'

class CharacterSheetBioCustom extends Component {

  get customBios () {
    return this.props.bios.map(bio => ({
      ...bio,
      isTitleEditable: true
    }))
  }

  handleEdit = (index, newBio) => {
    this.props.updateCharacter(`bio.customs.${index}`, newBio)
  }

  handleDelete = index => {
    this.props.updateCharacter('bio.customs', withoutIndex(this.props.bios, index))
  }

  handleSave = newBio => {
    this.props.updateCharacter('bio.customs', [
      ...this.props.bios,
      newBio
  ])
}

  render () {
    return (
      <>
        <EmpTableStrings items={this.customBios} onSave={this.handleEdit} onDelete={this.handleDelete}/>
        <EmpItemEditor
          title="Add Custom Bio FIeld"
          fields={{
            title: {
              value: ''
            },
            content: {
              value: '',
              isAllowingNewLines: true
            }
          }}
          mode="noStyle"
          onSave={this.handleSave}
        >
          <EmpIconButton color="success" icon="plus"/>
        </EmpItemEditor>
      </>
    )
  }
}

export default CharacterSheetBioCustom
