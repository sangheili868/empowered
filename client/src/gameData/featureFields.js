import skills from './skills.json'
import equipmentProficiencies from './equipmentProficiencies.json'
import { startCase } from 'lodash'

export default {
  name: '',
  description: '',
  cost: 1,
  actionTag: [
    { text: 'Not an Action', value: 'nonAction' },
    { text: 'Cardinal Action', value: 'cardinalAction' },
    { text: 'Skill Action', value: 'skillAction' },
    { text: 'Basic Action', value: 'basicAction' },
    { text: 'Maneuver', value: 'maneuver' },
    { text: 'Reaction', value: 'reaction'}
  ],
  skillTag: [
    { text: 'No Skill', value: 'noSkill' },
    ...skills.map(({name}) => ({ text: startCase(name), value: name}))
  ],
  equipmentTag: [
    { text: 'No Equipment', value: 'noEquipment' },
    ...Object.values(equipmentProficiencies).map(({name, category}) => ({ text: name, value: category}))
  ]
}
