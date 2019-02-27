import React, { Component } from 'react';
import EmpButton from './EmpButton/EmpButton'

class EmpJsonExporter extends Component {
  export = () => {
    let a = document.createElement('a')
    let file = new Blob([JSON.stringify(this.props.content)], {type: 'application/json'})
    a.href = URL.createObjectURL(file)
    a.download = this.props.fileName
    a.click()
    this.props.onSave()
  }
  render() {
    return (
      <EmpButton className={this.props.className} onClick={this.export}>
        {this.props.children}
      </EmpButton>
    )
  }
}

export default EmpJsonExporter;
