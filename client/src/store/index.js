
import { createStore, combineReducers } from 'redux'
import { createReducer } from 'redux-orm'
import orm from './orm'
export default createStore(combineReducers({
    orm: createReducer(orm)
}))