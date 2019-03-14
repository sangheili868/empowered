import React, { Component } from 'react'
import { recoveryButton, recoveryImg } from './CharacterPage.module.scss'
import EmpModal from '../../EmpModal/EmpModal';

class CharacterSheetStatsRecovery extends Component {
  render () {
    return (
      <EmpModal
        title={'Take ' + this.props.title}
        body={
          <>
            This recovery will take {this.props.duration}. After completing it, you gain
            the following effects:
            <ul>
              {this.props.effects.map(effect =>
                <li key={effect}>{effect}</li>
              )}
            </ul>
          </>
        }
        controls={[{
          label: 'Confirm',
          onClick: this.props.onConfirm
        }]}
        noStyle
        containerComponent="button"
        className={recoveryButton}
      >
        {this.props.title}
        <img className={recoveryImg} alt="Rest Icon" src={this.props.icon}/>
      </EmpModal>
    )
  }
}

export default CharacterSheetStatsRecovery
