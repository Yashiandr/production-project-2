import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';
import { User, UserSchema } from '../types/user';
import { setFeatureFlag } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/setJsonSettings';
import { initAuthData } from '../services/initAuthData';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            setFeatureFlag(action.payload.features);
            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                action.payload.id,
            );
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(
                saveJsonSettings.fulfilled,
                (state, { payload }) => {
                    if (state.authData) {
                        state.authData.jsonSettings = payload;
                    }
                },
            )
            .addCase(
                initAuthData.fulfilled,
                (state, { payload }) => {
                    state.authData = payload;
                    setFeatureFlag(payload.features);
                    if (payload.features?.isAppRedesign) {
                        document.body.classList.add('app_redesigned');
                    }
                    state._inited = true;
                },
            )
            .addCase(
                initAuthData.rejected,
                (state) => {
                    state._inited = true;
                },
            );
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
