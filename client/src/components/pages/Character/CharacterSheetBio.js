import React, { Component } from 'react'
import { map, startCase } from 'lodash'
import { Modal } from 'react-bootstrap'
import { bio, bioTable, row, cell, field, description } from './CharacterPage.module.scss'
import EmpStringEditor from '../../EmpStringEditor/EmpStringEditor'
import EmpButton from '../../EmpButton/EmpButton'
import bioFields from '../../../gameData/bioFields.json'

class CharacterSheetBio extends Component {
  state = {
    openModal: ''
  }
  toggleModal = (modal='') => {
    this.setState(prevState => ({
      ...prevState,
      openModal: (modal === prevState.openModal) ? '' : modal
    }))
  }
  render () {
    return (
      <>
        <div>
          Click on a field name for more information and examples.
        </div>
        <div className={bio}>
          <table className={bioTable}>
            <tbody>
              <tr className={row}>
                <Modal show={this.state.openModal === 'name'} onHide={this.toggleModal}>
                  <Modal.Header closeButton><Modal.Title>Name</Modal.Title></Modal.Header>
                  <Modal.Body>{bioFields.name}</Modal.Body>
                  <Modal.Footer><EmpButton onClick={this.toggleModal}>Close</EmpButton></Modal.Footer>
                </Modal>
                <td className={[cell, field].join(' ')} onClick={this.toggleModal.bind(this, 'name')}>
                  Name
                </td>
                  <td className={[cell, description].join(' ')}>
                    <EmpStringEditor value={this.props.name} onUpdate={value =>
                      this.props.onUpdate({ name: value })
                    }/>
                  </td>
              </tr>
              {map(this.props.bio, (value, characteristic) =>
                <tr className={row} key={characteristic}>
                  <Modal show={this.state.openModal === characteristic} onHide={this.toggleModal}>
                    <Modal.Header closeButton><Modal.Title>{startCase(characteristic)}</Modal.Title></Modal.Header>
                    <Modal.Body>{bioFields[characteristic]}</Modal.Body>
                    <Modal.Footer><EmpButton onClick={this.toggleModal}>Close</EmpButton></Modal.Footer>
                  </Modal>
                  <td className={[cell, field].join(' ')} onClick={this.toggleModal.bind(this, characteristic)}>
                    {startCase(characteristic)}
                  </td>
                  <td className={[cell, description].join(' ')}>
                    <EmpStringEditor value={value} onUpdate={value => this.props.onUpdate({
                      bio: { [characteristic]: value }
                    })}/>
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
