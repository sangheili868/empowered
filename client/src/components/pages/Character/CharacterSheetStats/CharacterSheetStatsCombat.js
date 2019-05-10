import React, { Component } from 'react'
import EmpCheckbox from '../../../EmpCheckbox/EmpCheckbox'
import CharacterSheetList from '../CharacterSheetList/CharacterSheetList'
import { detailTitle, checkboxes, reset } from '../CharacterPage.module.scss'
import EmpButton from '../../../EmpButton/EmpButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class CharacterSheetStatsCombat extends Component {

  state = {
    isCardinalUsed: false,
    isAction1Used: false,
    isAction2Used: false,
    isReactionUsed: false,
  }

  renderTooltipBody = item => {
    const hasFeatures = item.features && item.features.length > 0
    const features = hasFeatures && item.features.map(({ name }) => name).join(', ')
    const hasConditions = item.conditions && item.conditions.length > 0
    const conditions = hasConditions && item.conditions.map(({ name }) => name).join(', ')
    return (
      <>
        <div>{item.description}</div>
        {hasFeatures &&
          <>
            <div className={detailTitle}>Features Related to {item.name}</div>
            <div>{features}</div>
          </>
        }

        {hasConditions &&
          <>
            <div className={detailTitle}>Conditions Affecting {item.name}</div>
            <div>{conditions}</div>
          </>
        }
      </>
    )
  }

  handleClear = () => {
    this.setState({
      isCardinalUsed: false,
      isAction1Used: false,
      isAction2Used: false,
      isReactionUsed: false,
    })
  }

  get isAnySelected () {
    return this.state.isCardinalUsed ||
      this.state.isAction1Used ||
      this.state.isAction2Used ||
      this.state.isReactionUsed
  }

  get subtitles () {
    return [
      <div className={checkboxes} key="actions">
        <EmpCheckbox isChecked={this.state.isCardinalUsed} onToggle={isCardinalUsed => this.setState({ isCardinalUsed })}>
          Cardinal:
        </EmpCheckbox>
        <EmpCheckbox isChecked={this.state.isAction1Used} onToggle={isAction1Used => this.setState({ isAction1Used })}>
          Actions:
        </EmpCheckbox>
        <EmpCheckbox isChecked={this.state.isAction2Used} onToggle={isAction2Used => this.setState({ isAction2Used })}/>
        <EmpCheckbox isChecked={this.state.isReactionUsed} onToggle={isReactionUsed => this.setState({ isReactionUsed })}>
          Reaction:
        </EmpCheckbox>
        <EmpButton className={reset} mode="secondary" isDisabled={!this.isAnySelected} onClick={this.handleClear}>
          <FontAwesomeIcon icon="sync-alt"/>
        </EmpButton>
      </div>
    ]
  }

  render () {
    return (
      <CharacterSheetList
        title="Combat"
        subtitles={this.subtitles}
        items={this.props.actions}
        tooltips={{
          mode: ({ mode }) => mode || '',
          title: ({ name }) => name,
          body: this.renderTooltipBody
        }}
      />
    )
  }
}

export default CharacterSheetStatsCombat
