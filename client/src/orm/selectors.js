
import { createSelector } from 'redux-orm';
import orm from './orm';

const dbStateSelector = state => state.db;

export const characters = createSelector(
    orm,
    // The first input selector should always select the db-state.
    // Behind the scenes, `createSelector` begins a Redux-ORM session
    // with the value returned by `dbStateSelector` and passes
    // that Session instance as an argument instead.
    dbStateSelector,
    session => {
        return session.Caracter;
    }
);

export const character = createSelector(
    orm,
    // The first input selector should always select the db-state.
    // Behind the scenes, `createSelector` begins a Redux-ORM session
    // with the value returned by `dbStateSelector` and passes
    // that Session instance as an argument instead.
    dbStateSelector,
    (session, id) => {
        return session.Caracter.withId(id);
    }
);

export const bio = createSelector(
    orm,
    // The first input selector should always select the db-state.
    // Behind the scenes, `createSelector` begins a Redux-ORM session
    // with the value returned by `dbStateSelector` and passes
    // that Session instance as an argument instead.
    dbStateSelector,
    (session, id) => {
        return session.Bio.withId(id);
    }
);