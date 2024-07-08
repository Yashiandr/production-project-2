import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams';
import { selectArticlesPageLimit } from '../../selectors/selectArticlesPageLimit/selectArticlesPageLimit';
import { selectArticlesPageNumPage } from '../../selectors/selectArticlesPageNumPage/selectArticlesPageNumPage';
import { selectArticlesPageOrder } from '../../selectors/selectArticlesPageOrder/selectArticlesPageOrder';
import { selectArticlesPageSearch } from '../../selectors/selectArticlesPageSearch/selectArticlesPageSearch';
import { selectArticlesPageSort } from '../../selectors/selectArticlesPageSort/selectArticlesPageSort';
import { selectArticlesPageType } from '../../selectors/selectArticlesPageType/selectArticlesPageType';

interface FetchArticlesListProps {
    replace?: boolean;
}

export const fetchArticlesList = createAsyncThunk<
    Article[],
    FetchArticlesListProps,
    ThunkConfig<string>
>('articlesPage/fetchArticlesList', async (args, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const limit = selectArticlesPageLimit(getState());
    const sort = selectArticlesPageSort(getState());
    const order = selectArticlesPageOrder(getState());
    const search = selectArticlesPageSearch(getState());
    const page = selectArticlesPageNumPage(getState());
    const type = selectArticlesPageType(getState());

    try {
        addQueryParams({
            sort,
            order,
            search,
            type,
        });
        const response = await extra.api.get<Article[]>('/articles', {
            params: {
                _expand: 'user',
                _limit: limit,
                _page: page,
                _sort: sort,
                _order: order,
                type_like:
                    type === ArticleType.ALL ? undefined : `\\b${type}\\b`,
                q: search,
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
});
