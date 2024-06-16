import { selectUserAuthData } from 'entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';

export function RequireAuth({ children }: { children: JSX.Element }) {
    const auth = useAppSelector(selectUserAuthData);
    const location = useLocation();

    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />;
    }

    return children;
}
