import {attr, fk} from 'redux-orm'
import  NormalModel from './NormalModel'
import Bio from './bio'
import Stats from './stats'

export default class Character extends NormalModel {
  static get modelName() { return 'Character' }
  static get fields() {
    return {
      id: attr(),
      portrait: attr(),
      bio: fk('Bio', 'characters'),
      stats: fk('Stats', 'character'),
      shop: attr() // will be fk('Shop', 'character')
    }
  }

  static get nestedModel() {
    return {
      Bio,
      Stats
    }
  }

  static reducer(action, Character, _session) {
    const { payload, type } = action
    switch (type) {
      case 'createCharacter':
        Character.create(payload)
        break
      case 'deleteCharacter':
        Character.withId(payload).delete()
        break
      default:
        break
    }
  }
}