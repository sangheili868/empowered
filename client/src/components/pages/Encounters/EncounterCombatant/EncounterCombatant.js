import React, { Component } from 'react'
import EmpCard from '../../../EmpCard/EmpCard'
import { stats, block, title, dropdown, controlsBlock, controls, note } from './EncounterCombatant.module.scss'
import EmpDropdown from '../../../EmpDropdown/EmpDropdown'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import EmpIconButton from '../../../EmpIconButton/EmpIconButton'
import EncounterCombatantCounter from './EncounterCombatantCounter'
import { chain, startCase, debounce } from 'lodash'
import { Link } from 'react-router-dom'
import EmpLoadingDots from '../../../EmpLoadingDots/EmpLoadingDots'
import EmpTextInput from '../../../EmpTextInput/EmpTextInput'

class EncounterCombatant extends Component {

  state = {
    creatureOptions: [],
    note: this.props.combatant.note
  }

  handleEdit = ({ customName }) => {
    this.props.onUpdate('customName', customName)
  }

  get simpleFields () {
    return chain(this.props.combatant)
      .pick(['armor', 'evasion', 'shield'])
      .map((value, field) => ({ value, field }))
      .value()
  }

  get attack () {
    return this.props.combatant.attacks[this.props.combatant.attack]
  }

  handleOpenCombatant = () => {
    window.sessionStorage.setItem('creatureId', this.props.combatant._id)
  }

  debounceNoteUpdate = debounce(target => {
    this.props.onUpdate('note', target.value)
  }, 500)

  handleNoteChange = ({ target }) => {
    console.log(target)
    this.setState({ note: target.value })
    this.debounceNoteUpdate(target)
  }

  render () {
    return this.props.combatant.isNotLoaded ? (
      <EmpLoadingDots/>
    ) : (
      <EmpCard title={this.props.combatant.displayName} isStartingOpen>
        <table className={stats}>
          <tbody>
            <tr>
              <EncounterCombatantCounter
                title="Hit Points"
                field="hitPoints"
                value={this.props.combatant.hitPoints}
                max={this.props.combatant.maxHitPoints}
                onUpdate={this.props.onUpdate}
              />
              <EncounterCombatantCounter
                title="Power Points"
                field="powerPoints"
                value={this.props.combatant.powerPoints}
                max={this.props.combatant.maxPowerPoints}
                onUpdate={this.props.onUpdate}
              />
              <td className={block}>
                <div className={title}>Speed</div>
                <div>{this.props.combatant.speed}</div>
              </td>
            </tr>
            <tr>
              {this.simpleFields.map(({ value, field }) =>
                <td className={block} key={field}>
                  <div className={title}>{startCase(field)}</div>
                  <div>{value}</div>
                </td>
              )}
            </tr>
            <tr>
              <td colSpan="2" className={block}>
                {this.props.combatant.attackOptions.length > 1 ? (
                  <EmpDropdown
                    className={dropdown}
                    value={this.props.combatant.attackOptions[this.props.combatant.attack]}
                    options={this.props.combatant.attackOptions}
                    onSelect={this.props.onUpdate.bind(this, 'attack')}
                  />
                ) : (
                  <div className={title}>{this.attack && this.attack.name}</div>
                )}
                <div>{this.attack && `${this.attack.hit} to hit, ${this.attack.damage} damage`}</div>
                <div>{this.attack && this.attack.notes}</div>
              </td>
              <td className={[block, controlsBlock].join(' ')}>
                <div className={controls}>
                  <EmpItemEditor
                    title={'Edit ' + this.props.combatant.displayName}
                    fields={{
                      customName: {
                        value: this.props.combatant.customName,
                        validation: 'none'
                      }
                    }}
                    onSave={this.handleEdit}
                    onDelete={this.props.onDelete}
                    mode="noStyle"
                  >
                    <EmpIconButton color="edit" icon="pen"/>
                  </EmpItemEditor>
                  <Link to="/creatures" target="_blank" rel="noopener noreferrer" onClick={this.handleOpenCombatant}>
                    <EmpIconButton color="normal" icon="open"/>
                  </Link>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan="3" className={block}>
                <EmpTextInput className={note} value={this.state.note} onChange={this.handleNoteChange}/>
              </td>
            </tr>
          </tbody>
        </table>
      </EmpCard>
    )
  }
}

export default EncounterCombatant
