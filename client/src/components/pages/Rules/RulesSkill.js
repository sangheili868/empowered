import React, { Component } from 'react'
import skills from '../../../gameData/skills.json'
import { startCase, invert } from 'lodash'
import { skill } from './RulesPage.module.scss'
import { Modal } from 'react-bootstrap'
import EmpButton from '../../EmpButton/EmpButton'
import skillDescriptions from '../../../gameData/skillDescriptions.json'

class RulesSkill extends Component {
  state = {
    isOpen: false
  }
  toggleModal = () => {
    this.setState(prevState => ({ ...prevState, isOpen: !prevState.isOpen }))
  }
  render () {
    const skillName = invert(skills)[[this.props.firstScore, this.props.secondScore]]
    return (
      <>
        <Modal show={this.state.isOpen} onHide={this.toggleModal}>
          <Modal.Header closeButton><Modal.Title>{startCase(skillName)}</Modal.Title></Modal.Header>
          <Modal.Body>{skillDescriptions[skillName]}</Modal.Body>
          <Modal.Footer><EmpButton onClick={this.toggleModal}>Close</EmpButton></Modal.Footer>
        </Modal>
        <div className={skill} onClick={this.toggleModal}>{startCase(skillName)}</div>
      </>
    )
  }
}

export default RulesSkill
