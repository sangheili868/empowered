import React, { Component } from 'react'
import CreatureSheet from './CreatureSheet'
import Creature from '../../../classes/Creature'
import newCreature from '../../../gameData/newCreature'
import EmpDocManager from '../../EmpDocManager/EmpDocManager'
import EmpLoadingDots from '../../EmpLoadingDots/EmpLoadingDots'
import updateDocument from '../../../utils/updateDocument'

class CreaturesPage extends Component {

  state = {
    _id: '',
    baseCreature: null,
    creature: null
  }

  handleUpdateBaseCreature = (baseCreature) => {
    this.setState({
      baseCreature,
      creature: new Creature(baseCreature)
    })
  }

  handleUpdateId = _id => {
    this.setState({ _id })
  }

  handleUpdateCreature = async (paths, newValue) => {
    const { baseDocument, _id } = await updateDocument('creatures', this.state.baseCreature, paths, newValue)
    this.handleUpdateBaseCreature({ ...baseDocument, _id })
    this.handleUpdateId(_id)
  }

  handleDelete = () => {
    this.setState({
      _id: '',
      baseCreature: null,
      creature: null
    })
  }

  render() {
    return (
      <div>
        <EmpDocManager
          collection="creature"
          _id={this.state._id}
          document={this.state.baseCreature}
          newDocument={newCreature}
          onUpdateDocument={this.handleUpdateBaseCreature}
          onUpdateId={this.handleUpdateId}
        />
        {this.state.creature ? (
          <CreatureSheet
            _id={this.state._id}
            creature={this.state.creature}
            updateCreature={this.handleUpdateCreature}
            onDelete={this.handleDelete}
          />
        ) : this.state._id && (
          <EmpLoadingDots/>
        )}
      </div>
    );
  }
}

export default CreaturesPage
