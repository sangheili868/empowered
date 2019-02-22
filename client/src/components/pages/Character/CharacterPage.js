import React, { Component } from 'react'
import EmpJsonImporter from '../../EmpJsonImporter'
import CharacterSheet from './CharacterSheet'
import Character from '../../../classes/Character'
import {characters} from '../../../store/selectors'
import { connect } from 'react-redux';
import dispatchToProps from '../../../store/actions'

class CharacterPage extends Component {
  handleFileContent = fileContent => {

    this.setState({character: new Character(fileContent)})
  }
  render() {
    return (
      <div>
        <div>Import Character Sheet</div>
        <EmpJsonImporter onFileOpen={this.handleFileContent}/>
        {this.props.character &&
          <CharacterSheet character={this.props.character}/>
        }
      </div>
    );
  }
}
const stateToProps = (state) => {
  return {
    character: characters(state) ? characters(state)[0] : null
  }
}

export default connect(stateToProps, dispatchToProps)(CharacterPage);
