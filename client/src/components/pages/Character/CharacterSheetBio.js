import React, { Component } from 'react'
import { map, startCase } from 'lodash'
import { bio, bioTable, row, cell, field, description } from './CharacterPage.module.scss'
import EmpStringEditor from '../../EmpStringEditor/EmpStringEditor'
import bioFields from '../../../gameData/bioFields.json'
import EmpModal from '../../EmpModal/EmpModal'

class CharacterSheetBio extends Component {
  render () {
    return (
      <>
        <div>Click on a field name for more information and examples.</div>
        <div>Click on the text to change it.</div>
        <div className={bio}>
          <table className={bioTable}>
            <tbody>
              <tr className={row}>
                <EmpModal containerComponent='td' className={[cell, field].join(' ')} noStyle title="Name" body={bioFields.name}>
                  Name
                </EmpModal>
                <td className={[cell, description].join(' ')}>
                  <EmpStringEditor value={this.props.name} onSave={value =>
                    this.props.updateCharacter('name', value)
                  }/>
                </td>
              </tr>
              {map(this.props.bio, (value, characteristic) =>
                <tr className={row} key={characteristic}>
                  <EmpModal
                    containerComponent='td'
                    className={[cell, field].join(' ')}
                    noStyle
                    title={startCase(characteristic)}
                    body={bioFields[characteristic]}
                  >
                    {startCase(characteristic)}
                  </EmpModal>
                  <td className={[cell, description].join(' ')}>
                    <EmpStringEditor
                      value={value}
                      onSave={value => this.props.updateCharacter(['bio', characteristic], value)}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    )
  }
}

export default CharacterSheetBio
