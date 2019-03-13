import skills from './skills.json'
import equipmentProficiencies from './equipmentProficiencies.json'
import { startCase } from 'lodash'

export default {
  name: { default: '' },
  description: { default: '' },
  cost: { default: 1 },
  actionTags: { default: '', options: [
    { label: 'Cardinal Action', value: 'cardinalAction' },
    { label: 'Skill Action', value: 'skillAction' },
    { label: 'Basic Action', value: 'basicAction' },
    { label: 'Maneuver', value: 'maneuver' },
    { label: 'Reaction', value: 'reaction'}
  ]},
  skillTags: {
    default: [],
    options: skills.map(({name}) => ({ label: startCase(name), value: name}))
  },
  equipmentTags: {
    default: [],
    options: Object.values(equipmentProficiencies).map(({name, category}) => ({ label: name, value: category}))
  }
}
