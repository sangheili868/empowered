
import { createSelector as ormCreateSelector } from 'redux-orm'
import { createSelector } from 'reselect'
import orm from './orm'

const dbStateSelector = state => state.db
const ormSelector = state => state.orm

export const characters = createSelector (
    ormSelector,
    state => state,
    ormCreateSelector(
        orm,
        // The first input selector should always select the db-state.
        // Behind the scenes, `ormCreateSelector` begins a Redux-ORM session
        // with the value returned by `dbStateSelector` and passes
        // that Session instance as an argument instead.
        // dbStateSelector,
        session => {
            return session.Character.all().toModelArray()
        }
    )
)

export const character = ormCreateSelector(
    orm,
    // The first input selector should always select the db-state.
    // Behind the scenes, `ormCreateSelector` begins a Redux-ORM session
    // with the value returned by `dbStateSelector` and passes
    // that Session instance as an argument instead.
    dbStateSelector,
    (session, id) => {
        return session.Caracter.withId(id)
    }
)

export const bio = ormCreateSelector(
    orm,
    // The first input selector should always select the db-state.
    // Behind the scenes, `ormCreateSelector` begins a Redux-ORM session
    // with the value returned by `dbStateSelector` and passes
    // that Session instance as an argument instead.
    dbStateSelector,
    (session, id) => {
        return session.Bio.withId(id)
    }
)