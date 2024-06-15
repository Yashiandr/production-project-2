import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { selectProfileForm } from '../../selectors/selectProfileForm/selectProfileForm';
import { Profile, ValidateProfileError } from '../../types/profile';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<ValidateProfileError[]>>(
    'profile/updateProfileData',
    async (Profile, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        const formData = selectProfileForm(getState());

        const errors = validateProfileData(formData);

        if (errors.length > 0) {
            return rejectWithValue(errors);
        }

        try {
            const response = await extra.api.put<Profile>('/profile', formData);
            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
