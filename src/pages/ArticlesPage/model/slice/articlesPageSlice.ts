import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/providers/StoreProvider';
import { Article, ArticlesView } from 'entities/Article';
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { fetchArticlesList } from '../services/fetchArticlesList/fetchArticlesList';
import { ArticlesPageSchema } from '../types/ArticlesPageSchema';

const articlesAdapter = createEntityAdapter({
    selectId: (article: Article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<RootState>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

export const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        page: 1,
        hasMore: true,
        _inited: false,
    }),
    reducers: {
        setView: (state, action: PayloadAction<ArticlesView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as ArticlesView || ArticlesView.BIG;
            state.view = view;
            state.limit = view === ArticlesView.BIG ? 4 : 10;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticlesList.fulfilled, (state, action) => {
                state.isLoading = false;
                articlesAdapter.addMany(state, action.payload);
                state.hasMore = action.payload.length > 0;
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articlesPageActions } = articlesPageSlice;
export const { reducer: articlesPageReducer } = articlesPageSlice;
