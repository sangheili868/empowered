import React, { Component } from 'react'
import CreatureSheet from './CreatureSheet'
import Creature from '../../../classes/Creature'
import { cloneDeep, every, has, set, chain } from 'lodash'
import EmpModal from '../../EmpModal/EmpModal'
import newCreature from '../../../gameData/newCreature'
import { alert, manageCreature } from './CreaturesPage.module.scss'
import { Alert } from 'react-bootstrap'
import EmpDocLoader from '../../EmpDocLoader/EmpDocLoader'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { Helmet } from 'react-helmet'
import EmpLoadingDots from '../../EmpLoadingDots/EmpLoadingDots'

class CreaturesPage extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor(props) {
    super(props)
    const _id = props.cookies.get('creatureId')

    this.state = {
      _id,
      baseCreature: null,
      creature: null
    }

    if (_id) {
      fetch('/api/creatures/read', {
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

  handleLoad = baseCreature => {
    this.setState({
      baseCreature,
      creature: new Creature(baseCreature)
    })
    this.setIdCookie(baseCreature._id)
  }

  setIdCookie = _id => {
    this.props.cookies.set('creatureId', _id, { path: '/' })
    this.setState({ _id })
  }

  get name () {
    return this.state.creature && this.state.creature.name
  }

  get isUnnamedCreature () {
    return !this.state._id && this.state.creature
  }

  createNewCreature = () => {
    const baseCreature = cloneDeep(newCreature)
    this.setState({
      baseCreature,
      creature: new Creature(baseCreature)
    })
    this.setIdCookie('')
  }

  updateCreature = (paths, newValue) => {
    /*
      Single mode: updateCreature('stats.hitPoints', 10)
      Multi mode: updateCreature([
        { path: 'stat.hitPoints', value: 0},
        { path: `stats.weapons.${weaponIndex}`, value: {
          name: 'Longsword',
          category: 'twoHandedMeleeWeapon',
          weight: 'medium'}}
      ])
    */
    const isMultiMode = every(paths, pathValue => has(pathValue, 'path') && has(pathValue, 'value'))
    let baseCreature = cloneDeep(this.state.baseCreature)
    let _id = baseCreature._id

    if (isMultiMode) {
      paths.map(({ path, value }) => set(baseCreature, path, value))
      paths = chain(paths).keyBy('path').mapValues('value').value()
    } else {
      set(baseCreature, paths, newValue)
      paths = { [paths]: newValue}
    }

    if (_id) {
      this.updateCreatureInDatabase({ paths, _id })
    } else if (baseCreature.name) {
      this.createCreatureInDatabase(baseCreature)
    }

    this.setState({
      baseCreature,
      creature: new Creature(baseCreature)
    })
  }

  updateCreatureInDatabase = ({ paths, _id }) => {
    fetch('/api/creatures/update', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths, _id})
    })
  }

  createCreatureInDatabase = creature => {
    fetch('/api/creatures/create', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ document: creature })
    })
    .then(response => response.json())
    .then(_id => {
      this.setState(prevState => ({
        ...prevState,
        baseCreature: {
          ...prevState.baseCreature,
          _id
        }
      }))
      this.setIdCookie(_id)
    })
  }

  handleDelete = () => {
    fetch('/api/creatures/delete', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: this.state._id })
    })

    this.setState({
      _id: '',
      baseCreature: null,
      creature: null
    })
  }

  render () {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.name}</title>
        </Helmet>

        {this.isUnnamedCreature &&
          <Alert className={alert} variant="danger">
            Warning: Your creature will not be saved until it is given a name!
          </Alert>
        }

        <div className={manageCreature}>
          <EmpModal
            isBlocked={!this.isUnnamedCreature}
            title="Create New Creature"
            body="Are you sure you want to clear the creature data and load a new creature?"
            closeText="CANCEL"
            controls={[{
              label: 'CONFIRM',
              onClick: this.createNewCreature
            }]}
            onHide={this.handleCloseWarning}
            onBlocked={this.createNewCreature}
          >
            New
          </EmpModal>
          <EmpDocLoader collection="creatures" isUnnamed={this.isUnnamedCreature} onLoad={this.handleLoad}/>
        </div>
        {this.state.creature ? (
          <div>
            <CreatureSheet
              _id={this.state._id}
              creature={this.state.creature}
              updateCreature={this.updateCreature}
              onDelete={this.handleDelete}
            />
          </div>
        ) : this.state._id && (
          <EmpLoadingDots/>
        )}
      </div>
    )
  }
}

export default withCookies(CreaturesPage)
