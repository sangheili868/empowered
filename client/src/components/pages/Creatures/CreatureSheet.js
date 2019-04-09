import React, { Component } from 'react'
import { header, nameAndBio, name, portrait } from './CreaturesPage.module.scss'
import { chain } from 'lodash'
import CreatureSheetStats from './CreatureSheetStats/CreatureSheetStats'
import EmpTableStrings from '../../EmpTable/EmpTableStrings'

class CreatureSheet extends Component {

  get bioItems () {
    console.log(this.props.creature)
    return chain(this.props.creature).pick(['name', 'portrait', 'description']).map((content, title) => ({
      title,
      content,
      isAllowingNewLines: title !== 'name',
      ...((title !== 'name') && { validation: 'none' }),
      isTruncating: title === 'portrait'
    })).value()
  }

  handleSave = (index, { content }) => {
    const title = this.bioItems[index].title
    return this.props.updateCreature(title, content)
  }

  render () {
    return (
      <>
        <div className={header}>
          <div className={nameAndBio}>
            <div className={name}>{this.props.creature.name || 'Unnamed Creature'}</div>
            <EmpTableStrings items={this.bioItems} onSave={this.handleSave}/>
          </div>
          <div>
            {this.props.creature.portrait &&
              <img
                alt='Failed to load creature portrait'
                src={this.props.creature.portrait}
                className={portrait}
              />
            }
          </div>
        </div>
        <CreatureSheetStats
          stats={this.props.creature.stats}
          _id={this.props._id}
          updateCreature={this.props.updateCreature}
          onDelete={this.props.onDelete}
        />
      </>
    )
  }
}

export default CreatureSheet
