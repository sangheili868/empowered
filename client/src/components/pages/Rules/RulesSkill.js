import React, { Component } from 'react'
import skills from '../../../gameData/skills.json'
import { startCase, keyBy } from 'lodash'
import { skillDetail } from './RulesPage.module.scss'
import { Modal } from 'react-bootstrap'
import EmpButton from '../../EmpButton/EmpButton'

class RulesSkill extends Component {
  state = {
    isOpen: false
  }
  toggleModal = () => {
    this.setState(prevState => ({ ...prevState, isOpen: !prevState.isOpen }))
  }
  render () {
    const skill = keyBy(skills, 'abilityScores')[[this.props.firstScore, this.props.secondScore]]
    return (
      <>
        <Modal show={this.state.isOpen} onHide={this.toggleModal}>
          <Modal.Header closeButton><Modal.Title>{startCase(skill.name)}</Modal.Title></Modal.Header>
          <Modal.Body>{skill.description}</Modal.Body>
          <Modal.Footer><EmpButton onClick={this.toggleModal}>Close</EmpButton></Modal.Footer>
        </Modal>
        <div className={skillDetail} onClick={this.toggleModal}>{startCase(skill.name)}</div>
      </>
    )
  }
}

export default RulesSkill
