import actions from './actions.json'
import skills from './skills.json'
import equipmentProficiencies from './equipmentProficiencies.json'
import { startCase, chain } from 'lodash'

export default {
  name: { default: '' },
  description: { default: '' },
  cost: { default: 1 },
  actionType: { default: '', options: [
    { label: 'Cardinal Action', value: 'cardinalAction' },
    { label: 'Skill Action', value: 'skillAction' },
    { label: 'Basic Action', value: 'basicAction' },
    { label: 'Maneuver', value: 'maneuver' },
    { label: 'Reaction', value: 'reaction'}
  ]},
  actionTags: {
    default: [],
    options: chain(actions).flatMap(action => action).map(({name}) => ({ label: startCase(name), value: name})).value()
  },
  skillTags: {
    default: [],
    options: skills.map(({name}) => ({ label: startCase(name), value: name}))
  },
  equipmentTags: {
    default: [],
    options: Object.values(equipmentProficiencies).map(({name, category}) => ({ label: name, value: category}))
  }
}
