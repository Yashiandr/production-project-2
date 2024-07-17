import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';
import { selectUserAuthData } from '@/entities/User';
import { selectArticleEditPageData } from '../selectors/selectArticleEditPage/selectArticleEditPageData';
import { formatDate } from '@/shared/lib/formatDate/formatDate';
import { getArticleBlocks } from '../slice/articleEditPageSlice';

export const addArticle = createAsyncThunk<
    void,
    void,
    ThunkConfig<string>
>('articleEditPage/addArticle', async (_, thunkAPI) => {
    const { rejectWithValue, extra, getState } = thunkAPI;

    const userData = selectUserAuthData(getState());
    const article = selectArticleEditPageData(getState());
    const blocks = getArticleBlocks.selectAll(getState());

    if (!userData) {
        return rejectWithValue('no data');
    }

    const date = await formatDate(new Date());
    console.log(date);

    const postArticle: Partial<Article> = {
        userId: userData.id,
        Loading: undefined,
        views: 0,
        ...article,
        createdAt: date,
        blocks,
    };

    console.log(JSON.stringify(postArticle));

    try {
        const response = await extra.api.post<Article>('/articles', {
            ...postArticle,
        });

        if (!response.data) {
            throw new Error();
        }

        return undefined;
    } catch (e) {
        console.log(e);
        return rejectWithValue('ошибка');
    }
});
