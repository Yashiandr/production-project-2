import React, { memo, Suspense, useCallback } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRouteProps, routeConfig } from '@/shared/config/routeConfig/routeConfig';
import { PageLoader } from '@/widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

export const AppRouter = memo(() => {
    const renderWithWrapper = useCallback((route: AppRouteProps) => {
        const element = (
            // eslint-disable-next-line react/jsx-no-useless-fragment
            <>
                {route.element}
            </>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
            />
        );
    }, []);

    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                {Object.values(routeConfig).map(renderWithWrapper)}
            </Routes>
        </Suspense>
    );
});
