import React, { Component } from 'react';
import EmpButton from './EmpButton/EmpButton'

class EmpJsonExporter extends Component {
  get file () {
    return URL.createObjectURL(new Blob([JSON.stringify(this.props.content)], {type: 'application/json'}))
  }
  render() {
    return (
      <a href={this.file} download={this.props.fileName}>
        <EmpButton className={this.props.className} onClick={this.props.onSave}>
          {this.props.children}
        </EmpButton>
      </a>
    )
  }
}

export default EmpJsonExporter;
