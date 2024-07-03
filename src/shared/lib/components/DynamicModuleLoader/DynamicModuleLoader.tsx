/* eslint-disable @typescript-eslint/no-explicit-any */
import { EntityState, Reducer } from '@reduxjs/toolkit';
import { FC, PropsWithChildren, useEffect } from 'react';
import { StateSchema, StateSchemaKey } from '@/app/providers/StoreProvider';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppStore } from '../../hooks/useAppStore/useAppStore';

export type ReducerList = {
    // eslint-disable-next-line max-len
    [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>> | Reducer<NonNullable<EntityState<any, any> & StateSchema[name]>>;
}

interface DynamicModuleLoaderProps {
    reducers: ReducerList;
    removeAfterUnmount?: boolean;
}

export const DynamicModuleLoader: FC<PropsWithChildren<DynamicModuleLoaderProps>> = (props) => {
    const {
        children,
        reducers,
        removeAfterUnmount = true,
    } = props;

    const store = useAppStore();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const mountedReducers = store.reducerManager.getReducerMap();
        Object.entries(reducers).forEach(([name, reducer]) => {
            if (!mountedReducers[name as StateSchemaKey]) {
                store.reducerManager.add(name as StateSchemaKey, reducer);
                dispatch({ type: `@INIT ${name}` });
            }
        });
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store.reducerManager.remove(name as StateSchemaKey);
                    dispatch({ type: `@DESTROY ${name}` });
                });
            }
        };
        // eslint-disable-next-line
    }, []);

    return (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
            {children}
        </>
    );
};
