import React, { Component } from 'react'
import Encounter from '../../../classes/Encounter'
import { cloneDeep, every, has, set, chain } from 'lodash'
import EmpModal from '../../EmpModal/EmpModal'
import newEncounter from '../../../gameData/newEncounter'
import { alert, manage } from './EncountersPage.module.scss'
import { Alert } from 'react-bootstrap'
import EmpDocLoader from '../../EmpDocLoader/EmpDocLoader'
import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import { Helmet } from 'react-helmet'
import EmpLoadingDots from '../../EmpLoadingDots/EmpLoadingDots'
import EncounterDetails from './EncounterDetails'

class EncountersPage extends Component {

  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }

  constructor(props) {
    super(props)
    const _id = props.cookies.get('encounterId')

    this.state = {
      _id,
      baseEncounter: null,
      encounter: null
    }

    if (_id) {
      fetch('/api/encounters/read', {
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

  handleLoad = async baseEncounter => {
    const encounter = new Encounter(baseEncounter)
    await encounter.fetchCreatures()
    this.setState({ baseEncounter, encounter })
    this.setIdCookie(baseEncounter._id)
  }

  setIdCookie = _id => {
    this.props.cookies.set('encounterId', _id, { path: '/' })
    this.setState({ _id })
  }

  get name () {
    return this.state.encounter && this.state.encounter.name
  }

  get isUnnamedEncounter () {
    return !this.state._id && this.state.encounter
  }

  createNewEncounter = async () => {
    const baseEncounter = cloneDeep(newEncounter)
    const encounter = new Encounter(baseEncounter)
    await encounter.fetchCreatures()
    this.setState({ baseEncounter, encounter })
    this.setIdCookie('')
  }

  updateEncounter = async (paths, newValue) => {
    /*
      Single mode: updateEncounter('stats.hitPoints', 10)
      Multi mode: updateEncounter([
        { path: 'stat.hitPoints', value: 0},
        { path: `stats.weapons.${weaponIndex}`, value: {
          name: 'Longsword',
          category: 'twoHandedMeleeWeapon',
          weight: 'medium'}}
      ])
    */
    const isMultiMode = every(paths, pathValue => has(pathValue, 'path') && has(pathValue, 'value'))
    let baseEncounter = cloneDeep(this.state.baseEncounter)
    let _id = baseEncounter._id

    if (isMultiMode) {
      paths.map(({ path, value }) => set(baseEncounter, path, value))
      paths = chain(paths).keyBy('path').mapValues('value').value()
    } else {
      set(baseEncounter, paths, newValue)
      paths = { [paths]: newValue}
    }

    if (_id) {
      this.updateEncounterInDatabase({ paths, _id })
    } else if (baseEncounter.name) {
      this.createEncounterInDatabase(baseEncounter)
    }

    const encounter = new Encounter(baseEncounter)
    await encounter.fetchCreatures()
    this.setState({ baseEncounter, encounter })
  }

  updateEncounterInDatabase = ({ paths, _id }) => {
    fetch('/api/encounters/update', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths, _id})
    })
  }

  createEncounterInDatabase = encounter => {
    fetch('/api/encounters/create', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ document: encounter })
    })
    .then(response => response.json())
    .then(_id => {
      this.setState(prevState => ({
        ...prevState,
        baseEncounter: {
          ...prevState.baseEncounter,
          _id
        }
      }))
      this.setIdCookie(_id)
    })
  }

  handleDelete = () => {
    fetch('/api/encounters/delete', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: this.state._id })
    })

    this.setState({
      _id: '',
      baseEncounter: null,
      encounter: null
    })
  }

  render () {
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{this.name}</title>
        </Helmet>

        {this.isUnnamedEncounter &&
          <Alert className={alert} variant="danger">
            Warning: Your encounter will not be saved until it is given a name!
          </Alert>
        }

        <div className={manage}>
          <EmpModal
            isBlocked={!this.isUnnamedEncounter}
            title="Create New Encounter"
            body="Are you sure you want to clear the encounter data and load a new encounter?"
            closeText="CANCEL"
            controls={[{
              label: 'CONFIRM',
              onClick: this.createNewEncounter
            }]}
            onHide={this.handleCloseWarning}
            onBlocked={this.createNewEncounter}
          >
            New
          </EmpModal>
          <EmpDocLoader collection="encounters" isUnnamed={this.isUnnamedEncounter} onLoad={this.handleLoad}/>
        </div>
        {this.state.encounter ? (
          <EncounterDetails
            _id={this.state._id}
            encounter={this.state.encounter}
            updateEncounter={this.updateEncounter}
            onDelete={this.handleDelete}
          />
        ) : this.state._id && (
          <EmpLoadingDots/>
        )}
      </div>
    )
  }
}

export default withCookies(EncountersPage)
