import { Suspense, useEffect } from 'react';
import { selectUserInited, userActions } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { HStack } from '@/shared/ui/Stack';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';

function App() {
    const dispatch = useAppDispatch();
    const inited = useAppSelector(selectUserInited);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [])}>
            <Suspense fallback="">
                <Navbar />
                <HStack max align="stretch" className="content-page">
                    <Sidebar />
                    {inited && <AppRouter />}
                </HStack>
            </Suspense>
        </div>
    );
}

export default App;
