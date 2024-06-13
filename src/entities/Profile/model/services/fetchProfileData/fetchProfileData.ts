import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig, ThunkExtraArg } from 'app/providers/StoreProvider';
import i18n from 'shared/config/i18n/i18n';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/fetchProfileData',
    async (_, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        const extraApp = extra as ThunkExtraArg;

        try {
            const response = await extraApp.api.get<Profile>('/profile');

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue(i18n.t('Не удалось получить данные о профиле'));
        }
    },
);
