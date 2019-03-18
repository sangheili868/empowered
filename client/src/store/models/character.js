import {attr, fk} from 'redux-orm'
import  NormalModel from './NormalModel'
import Bio from './bio'

export default class Character extends NormalModel {
  static get modelName() { return 'Character' }
  static get fields() {
    return {
      id: attr(),
      portrait: attr(),
      bio: fk('Bio', 'caracters'),
      stats: attr(), // will be fk('Stats', 'caracter')
      shop: attr() // will be fk('Shop', 'caracter')
    }
  }

  static get nestedModel() {
    return {Bio: Bio}
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