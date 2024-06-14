import {
    EnhancedStore,
    Reducer,
    ReducersMapObject,
    StateFromReducersMapObject,
    StoreEnhancer,
    ThunkDispatch,
    Tuple,
    UnknownAction,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { LoginSchema } from 'features/AuthByUsername';
import { NavigateOptions, To } from 'react-router-dom';
import { CounterSchema } from '../../../../entities/Counter';
import { ProfileSchema } from '../../../../entities/Profile';
import { UserSchema } from '../../../../entities/User';

import { AppDispatch } from './store';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    login?: LoginSchema;
    profile?: ProfileSchema
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: UnknownAction) => StateFromReducersMapObject<ReducersMapObject<StateSchema>>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema, UnknownAction, Tuple<[StoreEnhancer<{
    dispatch: ThunkDispatch<StateSchema, unknown, UnknownAction>,
}>, StoreEnhancer]>> {
    reducerManager?: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance,
    navigate?: (to: To, options?: NavigateOptions) => void
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
    dispatch: AppDispatch;
}
