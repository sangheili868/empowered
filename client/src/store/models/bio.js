import {attr} from 'redux-orm'
import  NormalModel from './NormalModel'

export default class Bio extends NormalModel {
  static get modelName() { return 'Bio' }
  static get fields() {
    return {
      id: attr(),
      highConcept: attr(),
      flaw: attr(),
      ancestry: attr(),
      homeland: attr(),
      age: attr(),
      description: attr(),
      personalityTrait1: attr(),
      personalityTrait2: attr(),
      ideal: attr(),
      alignment: attr(),
      goal: attr(),
      fear: attr(),
      friend: attr(),
      enemy: attr(),
      otherCharacter: attr(),
      organization: attr(),
      goodMemory: attr(),
      badMemory: attr(),
      profession: attr(),
      hobbies: attr(),
      socialStyle: attr(),
      combatStyle: attr(),
      equipment: attr()
    }
  }
  static reducer(_state, action, Bio, _session){
    const { payload, type } = action
    switch (type) {
      case 'createBio':
        Bio.create({...payload})
        break
      case 'deleteBio':
        Bio.withId(payload).delete()
        break
      default:
        break
    }
  }
}
