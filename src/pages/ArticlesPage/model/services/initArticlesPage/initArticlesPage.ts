import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types';
import { selectArticlesPageInited } from '../../selectors/selectArticlesPageInited/selectArticlesPageInited';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams | null,
    ThunkConfig<string>
>(
    'article/initArticlesPage',
    async (searchParams, thunkApi) => {
        const {
            dispatch, getState,
        } = thunkApi;
        const inited = selectArticlesPageInited(getState());

        if (!inited) {
            const orderFromUrl = searchParams?.get('order') as SortOrder;
            const sortFromUrl = searchParams?.get('sort') as ArticleSortField;
            const typeFromUrl = searchParams?.get('type') as ArticleType;
            const searchFromUrl = searchParams?.get('search');

            dispatch(articlesPageActions.setOrder(orderFromUrl ?? 'asc'));
            dispatch(articlesPageActions.setSort(sortFromUrl ?? ArticleSortField.TITLE));
            dispatch(articlesPageActions.setSearch(searchFromUrl ?? ''));
            dispatch(articlesPageActions.setType(typeFromUrl ?? ArticleType.ALL));
            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({}));
        }
    },
);
