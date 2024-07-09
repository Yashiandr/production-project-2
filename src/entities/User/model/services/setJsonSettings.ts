import { createAsyncThunk } from '@reduxjs/toolkit';
import { JsonSettings } from '../types/jsonSettings';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { selectUserAuthData } from '../selectors/selectUserAuthData/selectUserAuthData';
import { selectJsonSettings } from '../selectors/selectJsonSettings/selectJsonSettings';
import { setJsonSettingsMutation } from '../../api/userApi';

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    JsonSettings,
    ThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi;

    const userData = selectUserAuthData(getState());
    const currentSettings = selectJsonSettings(getState());

    if (!userData) {
        return rejectWithValue('');
    }

    try {
        const response = await dispatch(setJsonSettingsMutation({
            userId: userData.id,
            jsonSettings: {
                ...currentSettings,
                ...newJsonSettings,
            },
        })).unwrap();

        if (!response.jsonSettings) {
            return rejectWithValue('');
        }

        return response.jsonSettings;
    } catch (e) {
        console.log(e);
        return rejectWithValue('');
    }
});
