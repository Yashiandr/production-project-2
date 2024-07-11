import { memo } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { useNotification } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import * as cls from './NotificationList.module.scss';
import { toggleFeatures } from '@/shared/lib/features';

interface NotificationProps {
    className?: string;
}

export const NotificationList = memo((props: NotificationProps) => {
    const { className } = props;
    const { data, isLoading } = useNotification(null, {
        pollingInterval: 10000,
    });

    const Skeleton = toggleFeatures({
        name: 'isAppRedesign',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    if (isLoading) {
        return (
            <VStack
                gap="16"
                max
                align="stretch"
                className={classNames(cls.NotificationList, {}, [className])}
            >
                <Skeleton width="100%" border="8px" height="90px" />
                <Skeleton width="100%" border="8px" height="90px" />
                <Skeleton width="100%" border="8px" height="90px" />
                <Skeleton width="100%" border="8px" height="90px" />
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            max
            align="stretch"
            className={classNames(cls.NotificationList, {}, [className])}
        >
            {data?.map((item) => (
                <NotificationItem key={item.id} item={item} />
            ))}
        </VStack>
    );
});
