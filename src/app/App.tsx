import { Suspense, useEffect, memo } from 'react';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { selectUserInited, initAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { AppRouter } from './providers/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayuot';
import { PageLoader } from '@/widgets/PageLoader';
import { useAppToolbar } from './lib/useAppToolbar';
import { withTheme } from './providers/ThemeProvider/ui/withTheme';

const App = memo(() => {
    const dispatch = useAppDispatch();
    const inited = useAppSelector(selectUserInited);
    const toolbar = useAppToolbar();

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if (!inited) {
        return (
            <ToggleFeatures
                feature="isAppRedesign"
                on={(
                    <div id="app" className={classNames('app_redesigned', {}, [])}>
                        <AppLoaderLayout />
                    </div>
                )}
                off={(
                    <div id="app" className={classNames('app', {}, [])}>
                        <PageLoader />
                    </div>
                )}
            />
        );
    }

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={(
                <div id="app" className={classNames('app_redesigned', {}, [])}>
                    <Suspense fallback="">
                        <MainLayout
                            header={<Navbar />}
                            content={<AppRouter />}
                            sidebar={<Sidebar />}
                            toolbar={toolbar}
                        />
                    </Suspense>
                </div>
            )}
            off={(
                <div id="app" className={classNames('app', {}, [])}>
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
});

export default withTheme(App);
