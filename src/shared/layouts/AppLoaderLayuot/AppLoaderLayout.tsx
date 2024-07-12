import { memo } from 'react';
import * as cls from './AppLoaderLayout.module.scss';
import { MainLayout } from '../MainLayout';
import { HStack, VStack } from '../../ui/redesigned/Stack';
import { Skeleton } from '../../ui/redesigned/Skeleton';

export const AppLoaderLayout = memo(() => (
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
));
