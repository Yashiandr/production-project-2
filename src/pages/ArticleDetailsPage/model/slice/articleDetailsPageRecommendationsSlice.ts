import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleDetailsPageRecommendationsSchema } from '../types/ArticleDetailsPageRecommendationsSchema';

const recommendationsAdapter = createEntityAdapter({
    selectId: (article: Article) => article.id,
});

export const getArticleRecommendations =
    recommendationsAdapter.getSelectors<RootState>(
        (state) =>
            state.articleDetailsRecommendations ||
            recommendationsAdapter.getInitialState(),
    );

export const articleDetailsPageRecommendationsSlice = createSlice({
    name: 'articleDetailsPageRecommendationsSlice',
    initialState:
        recommendationsAdapter.getInitialState<ArticleDetailsPageRecommendationsSchema>(
            {
                isLoading: false,
                error: undefined,
                ids: [],
                entities: {},
            },
        ),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                recommendationsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: articleDetailsPageRecommendationsActions,
    reducer: articleDetailsPageRecommendationsReducer,
} = articleDetailsPageRecommendationsSlice;
