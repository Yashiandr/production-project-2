import { Reducer } from '@reduxjs/toolkit';
import { StateSchemaKey } from 'app/providers/StoreProvider';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useAppDispatch } from '../../hooks/useAppDispatch/useAppDispatch';
import { useAppStore } from '../../hooks/useAppStore/useAppStore';

export type ReducerList = {
    [name in StateSchemaKey]?: Reducer;
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
        Object.entries(reducers).forEach(([name, reducer]) => {
            store!.reducerManager!.add(name as StateSchemaKey, reducer);
            dispatch({ type: `@INIT ${name}` });
        });
        return () => {
            if (removeAfterUnmount) {
                Object.entries(reducers).forEach(([name]) => {
                    store!.reducerManager!.remove(name as StateSchemaKey);
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
