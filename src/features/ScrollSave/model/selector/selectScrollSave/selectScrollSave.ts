import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';

export const selectScrollSave = (state: StateSchema) => state.scroll.scrollSave;
export const selectScrollSaveByPath = createSelector(
    selectScrollSave,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
