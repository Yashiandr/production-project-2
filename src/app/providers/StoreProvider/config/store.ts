import {
    configureStore,
    ReducersMapObject,
    StateFromReducersMapObject,
} from '@reduxjs/toolkit';
import { counterReducer } from '@/entities/Counter';
import { userReducer } from '@/entities/User';
import { scrollSaveReducer } from '@/features/ScrollSave';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import { createReducerManager } from './reducerManager';
import { StateSchema } from './StateSchema';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>,
) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        user: userReducer,
        counter: counterReducer,
        scroll: scrollSaveReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
        ...asyncReducers,
    };
    const reducerManager = createReducerManager(rootReducer);

    const store = configureStore({
        reducer:
            reducerManager.reduce as StateFromReducersMapObject<StateSchema>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: {
                        api: $api,
                    },
                },
            }).concat(rtkApi.middleware),
    });

    return Object.assign(store, { reducerManager });
}

export type AppStore = ReturnType<typeof createReduxStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
