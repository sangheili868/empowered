import React, { Component } from 'react'
import EmpCard from '../../../EmpCard/EmpCard'
import { stats, block, title, dropdown, controlsBlock, controls } from './EncounterCombatant.module.scss'
import EmpDropdown from '../../../EmpDropdown/EmpDropdown'
import EmpItemEditor from '../../../EmpItemEditor/EmpItemEditor'
import EmpIconButton from '../../../EmpIconButton/EmpIconButton'
import EncounterCombatantCounter from './EncounterCombatantCounter'
import { chain, startCase } from 'lodash'
import { Link } from 'react-router-dom'

class EncounterCombatant extends Component {

  state = {
    creatureOptions: []
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

  render () {
    return (
      <EmpCard
        title={this.props.combatant.displayName}
        isStartingOpen
        items={[this.props.combatant]}
        renderFields={this.renderFields}
        onDelete={this.handleDelete}
      >
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
                  <Link to="/creatures" >
                    <EmpIconButton color="normal" icon="open"/>
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </EmpCard>
    )
  }
}

export default EncounterCombatant
