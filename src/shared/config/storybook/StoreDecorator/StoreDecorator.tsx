import { ReducersMapObject } from '@reduxjs/toolkit';
import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';
import { loginReducer } from 'features/AuthByUsername';
import { profileReducer } from 'features/editableProfileCard/model/slice/profileSlice';
import { scrollSaveReducer } from 'features/ScrollSave';
import { articleDetailsCommentsReducer } from 'pages/ArticleDetailsPage/model/slice/articleDetailsCommentsSlice';
import {
    articleDetailsPageRecommendationsReducer,
} from 'pages/ArticleDetailsPage/model/slice/articleDetailsPageRecommendationsSlice';
import { articlesPageReducer } from 'pages/ArticlesPage/model/slice/articlesPageSlice';
import { ReducerList } from '../../../lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducerList = {
    login: loginReducer,
    scroll: scrollSaveReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    articleDetailsComments: articleDetailsCommentsReducer,
    articleDetailsRecommendations: articleDetailsPageRecommendationsReducer,
    articlesPage: articlesPageReducer,
};

export const StoreDecorator = (
    initialState: DeepPartial<StateSchema>,
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>,
) => (StoryComponent: StoryFn) => (
    <StoreProvider initialState={initialState} asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}>
        <StoryComponent />
    </StoreProvider>
);
