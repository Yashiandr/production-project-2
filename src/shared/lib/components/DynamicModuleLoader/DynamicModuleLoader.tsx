import { Reducer } from '@reduxjs/toolkit';
import { StateSchemaKey } from 'app/providers/StoreProvider/config/StateSchema';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/AppDispatch/AppDispatch';
import { useAppStore } from '../../hooks/AppStore/AppStore';

export type ReducerList = {
    [name in StateSchemaKey]?: Reducer;
}

type ReducersListEntry = [StateSchemaKey, Reducer]

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
        Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
            store.reducerManager.add(name, reducer);
            dispatch({ type: `@INIT ${name}` });
        });
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]: ReducersListEntry) => {
                    store.reducerManager.remove(name);
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
