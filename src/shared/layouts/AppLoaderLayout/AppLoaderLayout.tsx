import { memo } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import * as cls from './AppLoaderLayout.module.scss';
import { MainLayout } from '../MainLayout';
import { HStack, VStack } from '../../ui/redesigned/Stack';
import { Skeleton } from '../../ui/redesigned/Skeleton';
import { MobileLayout } from '../MobileLayout';
import { Card } from '../../ui/redesigned/Card';

export const AppLoaderLayout = memo(() => (
    <>
        <BrowserView>
            <MainLayout
                header={(
                    <HStack className={cls.header}>
                        <Skeleton width={40} height={40} border="50%" />
                    </HStack>
                )}
                content={(
                    <VStack gap="16" align="start" style={{ height: '100%' }}>
                        <Skeleton width="70%" height={32} border="16px" />
                        <Skeleton width="40%" height={28} border="16px" />
                        <Skeleton width="50%" height={28} border="16px" />
                        <Skeleton width="30%" height={32} border="16px" />
                        <Skeleton width="80%" height="40%" border="16px" />
                        <Skeleton width="80%" height="40%" border="16px" />
                    </VStack>
                )}
                sidebar={<Skeleton border="32px" width={220} height="100%" />}
            />
        </BrowserView>
        <MobileView>
            <MobileLayout
                header={(
                    <HStack
                        justify="end"
                        gap="16"
                        className={cls.header}
                    >
                        <Skeleton width={32} height={32} dark />
                        <Skeleton height={48} width={48} border="50%" dark />
                    </HStack>
                )}
                content={<Skeleton width="100%" height="50vh" />}
                sidebar={<Card><Skeleton width="60vw" height="100vh" /></Card>}
            />
        </MobileView>
    </>

));
