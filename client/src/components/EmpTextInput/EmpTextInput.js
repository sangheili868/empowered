import React, { Component } from 'react'
import { input, invalid } from './EmpTextInput.module.scss'
import { omit } from 'lodash'
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

  get classNames () {
    return [
      this.props.className,
      input,
      ...this.props.isInvalid ? [invalid] : []
    ].join(' ')
  }
  
  render () {
    return (
      <textarea
        ref={this.myTextArea}
        rows="1"
        {...omit(this.props, 'isInvalid')}
        className={this.classNames}
        onInput={this.autoResize}
      />
    )
  }
}

export default EmpTextInput
