
import { createStore, combineReducers } from 'redux';
import orm from './orm'
export default createStore(combineReducers({
    orm: orm.state()
}))