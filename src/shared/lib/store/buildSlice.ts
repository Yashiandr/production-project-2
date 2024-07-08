import { createSlice, bindActionCreators } from '@reduxjs/toolkit';
import {
    SliceCaseReducers,
    SliceSelectors,
    CreateSliceOptions,
} from '@reduxjs/toolkit/dist';
import { useMemo } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch/useAppDispatch';

export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string,
    Selectors extends SliceSelectors<State>,
    ReducerPath extends string = Name,
>(
    options: CreateSliceOptions<
        State,
        CaseReducers,
        Name,
        ReducerPath,
        Selectors
    >,
) {
    const slice = createSlice(options);

    const useActions = (): typeof slice.actions => {
        const dispatch = useAppDispatch();

        return useMemo(
            () => bindActionCreators(slice.actions, dispatch),
            [dispatch],
        );
    };

    return {
        ...slice,
        useActions,
    };
}
