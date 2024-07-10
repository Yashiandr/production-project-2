import { Suspense, useEffect } from 'react';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { selectUserInited, initAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';

function App() {
    const dispatch = useAppDispatch();
    const inited = useAppSelector(selectUserInited);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) {
        return <PageLoader />;
    }

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={(
                <div className={classNames('app_redesigned', {}, [])}>
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                            toolbar={<div />}
                        />
                    </Suspense>
                </div>
            )}
            off={(
                <div className={classNames('app', {}, [])}>
                    <Suspense fallback="">
                        <Navbar />
                        <HStack max align="stretch" className="content-page">
                            <Sidebar />
                            {inited && <AppRouter />}
                        </HStack>
                    </Suspense>
                </div>
            )}
        />
    );
}

export default App;
