
import { ORM } from 'redux-orm'
import bio from './models/bio'
import character from './models/character'
import stats from './models/stats'

export const orm = new ORM()
orm.register(bio, character, stats)

export default orm