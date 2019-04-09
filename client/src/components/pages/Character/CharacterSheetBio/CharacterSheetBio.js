import React, { Component } from 'react'
import { chain } from 'lodash'
import bioFields from '../../../../gameData/bioFields.json'
import CharacterSheetBioCustom from './CharacterSheetBioCustom'
import EmpTableStrings from '../../../EmpTable/EmpTableStrings'

class CharacterSheetBio extends Component {

  get bioItems () {
    return [
      {
        title: 'name',
        content: this.props.name,
        description: bioFields['name']
      },
      ...chain(this.props.bio).omit('customs').map((content, title) => ({
        title,
        content,
        isAllowingNewLines: true,
        validation: 'none',
        description: bioFields[title],
        isTruncating: title === 'portrait'
      })).value()
    ]
  }

  handleSave = (index, { content }) => {
    const title = this.bioItems[index].title
    const path = (title === 'name') ? 'name' : `bio.${title}`
    return this.props.updateCharacter(path, content)
  }

  render () {
    return (
      <>
        <EmpTableStrings items={this.bioItems} onSave={this.handleSave}/>
        <CharacterSheetBioCustom
          bios={this.props.bio.customs || []}
          updateCharacter={this.props.updateCharacter}
        />
      </>
    )
  }
}

export default CharacterSheetBio
