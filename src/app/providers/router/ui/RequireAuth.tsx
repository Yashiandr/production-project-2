import { useMemo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectUserAuthData, selectUserRoles, UserRole } from '@/entities/User';
import { RoutePath } from '@/shared/config/routeConfig/routeConfig';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';

interface RequireAuthProps {
    children: JSX.Element;
    roles?: UserRole[]
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
    const auth = useAppSelector(selectUserAuthData);
    const location = useLocation();
    const userRoles = useAppSelector(selectUserRoles);

    const hasRequiredRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        return roles.some((requiredRole) => userRoles?.includes(requiredRole));
    }, [roles, userRoles]);

    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    if (!hasRequiredRoles) {
        return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
    }

    return children;
}
