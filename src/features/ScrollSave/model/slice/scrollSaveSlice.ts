import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ScrollSaveSchema } from '../types/ScrollSaveSchema';

const initialState: ScrollSaveSchema = {
    scrollSave: {},
};

export const scrollSaveSlice = createSlice({
    name: 'ScrollSave',
    initialState,
    reducers: {
        setScrollPosition: (
            state: ScrollSaveSchema,
            { payload }: PayloadAction<{ path: string; position: number }>,
        ) => {
            state.scrollSave[payload.path] = payload.position;
        },
    },
});

export const { actions: scrollSaveActions, reducer: scrollSaveReducer } =
    scrollSaveSlice;
