import { Model } from 'redux-orm'
import { normalize, schema } from 'normalizr'
import _ from 'lodash'


export default class NormalModel extends Model {
  constructor(...args){
    super(...args)
  }
  static create(input) {
    const data = normalize(input, this.schema)
    _.forEach(data.entities, (entity, key) => {
      _.forEach(entity, (value) => {
        if (key === this.modelName) {
          super.create(value)
        } else if(this.nestedModel[key]) {
          this.session[key].create(value)
        }
      })
    })
  }

  static get nestedModel () {
    throw('this is an abstract function and needs implementation')
  }

  static processStrategy (value) {
    value.id = NormalModel.nextId++
    return {...value}
  }

  static get schema() {
    let relations = _.pickBy(
      this.fields,
      (field) => {
        return field.constructor.name !== 'Attribute'
      }
    )
    relations = _.map(
      relations,
      (field, name) => {
        return [name, this.nestedModel[field.toModelName].schema]
      }
    )
    relations = _.fromPairs(relations)
    return new schema.Entity(
      this.modelName, 
      relations, 
      { processStrategy: this.processStrategy }
    )
  }
}
NormalModel.nextId = 0