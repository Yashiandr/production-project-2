import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { selectArticlesPageHasMore } from '../../selectors/selectArticlesPageHasMore/selectArticlesPageHasMore';
import { selectArticlesPageIsLoading } from '../../selectors/selectArticlesPageIsLoading/selectArticlesPageIsLoading';
import { selectArticlesPageNumPage } from '../../selectors/selectArticlesPageNumPage/selectArticlesPageNumPage';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList';

export const fetchNextArticlesPage = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>(
    'article/fetchNextArticlesPage',
    async (_, thunkApi) => {
        const {
            getState, dispatch,
        } = thunkApi;
        const hasMore = selectArticlesPageHasMore(getState());
        const page = selectArticlesPageNumPage(getState());
        const isLoading = selectArticlesPageIsLoading(getState());

        if (hasMore && !isLoading) {
            dispatch(articlesPageActions.setPage(page + 1));
            dispatch(fetchArticlesList({}));
        }
    },
);
