import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { selectProfileForm } from '../../selectors/selectProfileForm/selectProfileForm';
import { Profile } from '../../types/profile';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    'profile/updateProfileData',
    async (Profile, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        const formData = selectProfileForm(getState());

        try {
            const response = await extra.api.put<Profile>('/profile', formData);
            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Не удалось загрузить данные о пользователе');
        }
    },
);
