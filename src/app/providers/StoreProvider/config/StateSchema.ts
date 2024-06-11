import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { LoginSchema } from 'features/AuthByUsername';
import { createReduxStore } from './store';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    login: LoginSchema;
}

const store = createReduxStore();

export type AppDispatch = typeof store.dispatch
