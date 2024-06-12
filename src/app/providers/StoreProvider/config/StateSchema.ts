import {
    EnhancedStore,
    Reducer,
    ReducersMapObject,
    StoreEnhancer,
    ThunkDispatch,
    Tuple,
    UnknownAction,
} from '@reduxjs/toolkit';
import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { createReduxStore } from './store';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    login?: LoginSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: UnknownAction) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema, UnknownAction, Tuple<[StoreEnhancer<{
    dispatch: ThunkDispatch<StateSchema, undefined, UnknownAction>
}>, StoreEnhancer]>> {
    reducerManager?: ReducerManager;
}

const store = createReduxStore();

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
