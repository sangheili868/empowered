import React, { Component } from 'react'
import { input } from './EmpTextInput.module.scss'

class EmpTextInput extends Component {
  constructor(props) {
    super(props)
    this.myTextArea = React.createRef()
  }
  componentDidMount () {
    setTimeout(this.autoResize, 0)
  }
  autoResize = () => {
    const myTextArea = this.myTextArea.current
    myTextArea.style.height = myTextArea.scrollHeight+'px';
    myTextArea.scrollTop = myTextArea.scrollHeight;
  }
  render () {
    return (
      <textarea
        ref={this.myTextArea}
        rows="1"
        {...this.props}
        className={[this.props.className, input].join(' ')}
        onInput={this.autoResize}
      />
    )
  }
}

export default EmpTextInput
