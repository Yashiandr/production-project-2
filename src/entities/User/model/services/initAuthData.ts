import { createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../types/user';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { getUserDataByIdQuery } from '../../api/userApi';

export const initAuthData = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
    >('user/initAuthData', async (_, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi;

        const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY);

        if (!userId) {
            return rejectWithValue('');
        }

        try {
            return await dispatch(getUserDataByIdQuery(userId)).unwrap();
        } catch (e) {
            console.log(e);
            return rejectWithValue('');
        }
});