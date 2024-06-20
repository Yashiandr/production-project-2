import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { selectArticleDetailsData } from 'entities/Article';
import { selectUserAuthData } from 'entities/User';

import i18n from 'shared/config/i18n/i18n';
import { fetchCommentsArticleById } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

export const addCommentForArticle = createAsyncThunk<
    Comment,
    string,
    ThunkConfig<string>
>(
    'articlesDetailsPage/addCommentForArticle',
    async (text, thunkAPI) => {
        const {
            rejectWithValue, dispatch, extra, getState,
        } = thunkAPI;

        const userData = selectUserAuthData(getState());
        const article = selectArticleDetailsData(getState());

        if (!userData || !text || !article) {
            return rejectWithValue('no data');
        }

        try {
            const response = await extra.api.post<Comment>('/comments', {
                articleId: article.id,
                userId: userData.id,
                text,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(fetchCommentsArticleById(article.id));

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue(i18n.t('Вы ввели неверный логин или пароль'));
        }
    },
);
