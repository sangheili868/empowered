import actions from './actions.json'
import skills from './skills.json'
import equipmentProficiencies from './equipmentProficiencies.json'
import { startCase, chain } from 'lodash'

export default {
  name: { value: '' },
  description: { value: '' },
  boosted: { value: '', validation: 'none' },
  cost: { value: 1, validation: 'number' },
  actionType: {
    value: '',
    validation: 'none',
    options: [
      { label: 'Cardinal Action', value: 'cardinalAction' },
      { label: 'Skill Action', value: 'skillAction' },
      { label: 'Basic Action', value: 'basicAction' },
      { label: 'Maneuver', value: 'maneuver' },
      { label: 'Reaction', value: 'reaction'}
    ]
  },
  actionTags: {
    isMulti: true,
    value: [],
    validation: 'none',
    options: chain(actions).flatMap(action => action).map(({name}) => ({ label: startCase(name), value: name})).value()
  },
  skillTags: {
    isMulti: true,
    value: [],
    validation: 'none',
    options: skills.map(({name}) => ({ label: startCase(name), value: name}))
  },
  equipmentTags: {
    isMulti: true,
    value: [],
    validation: 'none',
    options: Object.values(equipmentProficiencies).map(({name, category}) => ({ label: name, value: category}))
  },
  speedModifier: {
    value: '',
    validation: 'none',
    options: [
      { label: 'Set to 0ft.', value: 'set0' },
      { label: 'Set to 5ft.', value: 'set5' },
      { label: 'Add 5ft.', value: 'add5' },
      { label: 'Subtract 5ft.', value: 'subtract5' },
    ]
  }
}
