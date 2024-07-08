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
import { ArticleDetailsSchema } from '@/entities/Article';
import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { AddCommentFormSchema } from '@/features/AddNewComment';
import { LoginSchema } from '@/features/AuthByUsername';
import { ProfileSchema } from '@/features/editableProfileCard';
import { ScrollSaveSchema } from '@/features/ScrollSave';
import {
    ArticleDetailsCommentSchema,
    ArticleDetailsPageRecommendationsSchema,
} from '@/pages/ArticleDetailsPage';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { rtkApi } from '@/shared/api/rtkApi';

import { AppDispatch } from './store';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema;
    scroll: ScrollSaveSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
    login?: LoginSchema;
    profile?: ProfileSchema;
    articleDetails?: ArticleDetailsSchema;
    articleDetailsComments?: ArticleDetailsCommentSchema;
    articleDetailsRecommendations?: ArticleDetailsPageRecommendationsSchema;
    addCommentForm?: AddCommentFormSchema;
    articlesPage?: ArticlesPageSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: UnknownAction,
    ) => StateFromReducersMapObject<ReducersMapObject<StateSchema>>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager
    extends EnhancedStore<
        StateSchema,
        UnknownAction,
        Tuple<
            [
                StoreEnhancer<{
                    dispatch: ThunkDispatch<
                        StateSchema,
                        unknown,
                        UnknownAction
                    >;
                }>,
                StoreEnhancer,
            ]
        >
    > {
    reducerManager?: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
    dispatch: AppDispatch;
}
