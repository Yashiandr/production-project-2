import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY, LOCAL_STORAGE_LAST_DESIGN_KEY } from '@/shared/const/localstorage';
import { User, UserSchema } from '../types/user';
import { setFeatureFlag, toggleFeatures } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/setJsonSettings';
import { initAuthData } from '../services/initAuthData';

const initialState: UserSchema = {
    _inited: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, { payload }: PayloadAction<User>) => {
            state.authData = payload;
            setFeatureFlag(payload.features);
            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                payload.id,
            );
            localStorage.setItem(LOCAL_STORAGE_LAST_DESIGN_KEY, payload.features?.isAppRedesign ? 'new' : 'old');
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
                    toggleFeatures({
                        name: 'isAppRedesign',
                        on: () => {
                            document.body.classList.add('app_redesigned');
                        },
                        off: () => {
                            document.body.classList.add('app');
                        },
                    });
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
