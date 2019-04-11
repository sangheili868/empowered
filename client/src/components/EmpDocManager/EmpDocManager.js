import React, { Component } from 'react'
import { cloneDeep, startCase } from 'lodash'
import EmpModal from '../EmpModal/EmpModal'
import { alert, manage } from './EmpDocManager.module.scss'
import { Alert } from 'react-bootstrap'
import EmpDocLoader from '../EmpDocLoader/EmpDocLoader'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { Helmet } from 'react-helmet'
import pluralize from 'pluralize'

class EmpDocManager extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  get collection () {
    return pluralize(this.props.collection)
  }

  constructor(props) {
    super(props)
    const _id = window.sessionStorage.getItem(this.props.collection + 'Id') || props.cookies.get(this.props.collection + 'Id')
    this.setIdCookie(_id)
    
    if (_id) {
      fetch(`/api/${this.collection}/read`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id })
      })
        .then(response => response.json())
        .then(results => {
          if (results.error) {
            this.setIdCookie('')
          } else {
            this.handleLoad(results)
          }
        })
    }
  }

  createNewDocument = () => {
    const baseDocument = cloneDeep(this.props.newDocument)
    this.props.onUpdateDocument(baseDocument)
    this.setIdCookie('')
  }

  handleLoad = baseDocument => {
    this.props.onUpdateDocument(baseDocument)
    this.setIdCookie(baseDocument._id)
  }

  setIdCookie = _id => {
    window.sessionStorage.setItem(this.props.collection + 'Id', _id)
    this.props.cookies.set(this.props.collection + 'Id', _id, { path: '/' })
    this.props.onUpdateId(_id)
  }

  get isUnnamed () {
    return !this.props._id && this.props.document
  }

  get name () {
    return this.props.document && this.props.document.name
  }

  render () {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.name}</title>
        </Helmet>

        {this.isUnnamed &&
          <Alert className={alert} variant="danger">
            Warning: Your {this.props.collection} will not be saved until it is given a name!
          </Alert>
        }

        <div className={manage}>
          <EmpModal
            isBlocked={!this.isUnnamed}
            title={'Create New Character' + startCase(this.props.collection)}
            body={`Are you sure you want to clear the ${this.props.collection} data and load a new ${this.props.collection}?`}
            closeText="CANCEL"
            controls={[{
              label: 'CONFIRM',
              onClick: this.createNewDocument
            }]}
            onBlocked={this.createNewDocument}
          >
            New
          </EmpModal>
          <EmpDocLoader collection={this.collection} isUnnamed={this.isUnnamed} onLoad={this.handleLoad}/>
        </div>
      </>
    );
  }
}

export default withCookies(EmpDocManager)
