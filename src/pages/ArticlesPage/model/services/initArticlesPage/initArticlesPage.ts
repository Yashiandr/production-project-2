import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { selectArticlesPageInited } from '../../selectors/selectArticlesPageInited/selectArticlesPageInited';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const initArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'article/initArticlesPage',
    async (_, thunkApi) => {
        const {
            dispatch, getState,
        } = thunkApi;
        const inited = selectArticlesPageInited(getState());
        if (!inited) {
            dispatch(articlesPageActions.initState());
            dispatch(fetchArticlesList({
                page: 1,
            }));
        }
    },
);
