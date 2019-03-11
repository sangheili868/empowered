import React, { Component } from 'react';
import EmpButton from './EmpButton/EmpButton'

class EmpJsonExporter extends Component {
  render() {
    const file = URL.createObjectURL(new Blob([JSON.stringify(this.props.content)], {type: 'application/json'}))
    return (
      <a ref={this.downloadAnchor} href={file} download={this.props.fileName}>
        <EmpButton className={this.props.className} onClick={this.props.onSave}>
          {this.props.children}
        </EmpButton>
      </a>
    )
  }
}

export default EmpJsonExporter;
