import {attr, Model} from 'redux-orm';

export default class Character extends Model {
  static get modelName() { return 'Character' }
  static get fields() {
    return {
      id: attr(),
      portrait: attr(),
      stats: attr(), // will be fk('Stats', 'caracter')
      shop: attr() // will be fk('Shop', 'caracter')
    }
  }
  static reducer(_state, action, Character, _session) {
    const { payload, type } = action;
    switch (type) {
      case 'createCharacter':
        Character.create({...payload});
        break;
      case 'deleteCharacter':
        Character.withId(payload).delete();
        break;
      default:
        break;
    }
  }
}