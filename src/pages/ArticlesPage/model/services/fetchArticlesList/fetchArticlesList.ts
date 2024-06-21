import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { selectArticlesPageLimit } from '../../selectors/selectArticlesPageLimit/selectArticlesPageLimit';

interface FetchArticlesListProps {
    page?: number;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>(
    'article/fetchArticlesList',
    async (args, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi;
        const { page = 1 } = args;
        const limit = selectArticlesPageLimit(getState());

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                },
            });

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Не удалось получить данные о статье');
        }
    },
);
