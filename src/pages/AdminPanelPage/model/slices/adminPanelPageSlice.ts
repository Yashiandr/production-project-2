import { createSlice } from '@reduxjs/toolkit';
import { AdminPanelPageSchema } from '../types/AdminPanelPageSchema';

const initialState: AdminPanelPageSchema = {};

export const adminPanelPageSlice = createSlice({
    name: 'adminPanelPage',
    initialState,
    reducers: {
        // template: (state, action) => {
        //
        // },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchArticleById.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(fetchArticleById.fulfilled, (state, action) => {
    //             state.isLoading = false;
    //             state.data = action.payload;
    //         })
    //         .addCase(fetchArticleById.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

export const { actions: AdminPanelPageActions } = adminPanelPageSlice;
export const { reducer: AdminPanelPageReducer } = adminPanelPageSlice;
