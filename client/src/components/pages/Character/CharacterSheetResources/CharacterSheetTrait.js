import React, { Component } from 'react'
import { resource, trait, subtext } from "./CharacterSheetResources.module.scss"
import EmpCard from '../../../EmpCard/EmpCard'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import { startCase } from 'lodash'

class CharacterSheetTrait extends Component {
  render () {
    return (
      <EmpCard isLocked title={startCase(this.props.trait)}>
        <EmpItemEditor
          title={'Edit ' + startCase(this.props.trait)}
          mode="text"
          className={trait}
          fields={this.props.fields}
          description={this.props.description}
          onSave={values => this.props.onUpdate(['stats', this.props.trait], values)}
        >
          <div className={resource} style={{ backgroundImage: `url(${this.props.icon})` }}>
            {this.props.value}
          </div>
          <div className={subtext}>{this.props.subtext}</div>
        </EmpItemEditor>
      </EmpCard>
    )
  }
}

export default CharacterSheetTrait
