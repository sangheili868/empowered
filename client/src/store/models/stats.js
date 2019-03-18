import {attr, fk} from 'redux-orm'
import  NormalModel from './NormalModel'

export default class Stats extends NormalModel {
  static get modelName() { return 'Stats'}
  static fields() {
    return {
      hitPoints: attr(),
      tempHP: attr(),
      wounds: attr(),
      armor: attr(),//{ rating: 1,type: "lightArmor" },
      shield: attr(),// { rating: 0, type: "none" },
      speed: attr(), //  { rating: 20, type: "walking" },
      abilityScores: attr(), 
      // { strong: -2, aware: 0, smart: 1, quick: 1, determined: -1, social: 2 },
      powerDice: attr(), 
      // { d4s: { current: 2, max: 2 },
      //  d6s: { current: 1, max: 1 },
      //  d8s: { current: 0, max: 0 },
      //  d10s: { current: 0, max: 0 },
      //  d12s: { current: 0, max: 0 } }
    }
  }

  static reducer(_state, { payload, type}, Stats, _session){
    switch (type) {
      case 'createStats':
        Stats.create({...payload})
        break
      case 'deleteStats':
        Stats.withId(payload).delete()
    }
  }
}