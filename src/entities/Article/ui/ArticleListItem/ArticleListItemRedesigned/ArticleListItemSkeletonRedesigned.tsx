import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import * as cls from './ArticleListItemRedesigned.module.scss';
import { ArticleListItemSkeletonProps } from '../ArticleListItemSkeleton';
import { ArticlesView } from '../../../model/consts/consts';
import { getVStack, HStack } from '@/shared/ui/redesigned/Stack';

export const ArticleListItemSkeletonRedesigned = memo(
    ({ view }: ArticleListItemSkeletonProps) => {
        if (view === ArticlesView.BIG) {
            return (
                <Card
                    padding="24"
                    className={classNames('', {}, [
                        cls[view],
                        getVStack({
                            max: true,
                            gap: '16',
                            align: 'stretch',
                        }),
                    ])}
                    data-testid="ArticleListItem"
                >
                    <HStack gap="8">
                        <Skeleton border="50%" width={32} height={32} />
                        <Skeleton width="200" height={24} />
                    </HStack>
                    <Skeleton width="100%" height={32} />
                    <Skeleton width="50%" height={24} />
                    <Skeleton width="100%" height={420} />
                    <Skeleton width="100%" height={72} />
                    <HStack max justify="between">
                        <Skeleton width={200} height={42} border="34px" />
                        <Skeleton width={100} height={32} />
                    </HStack>
                </Card>
            );
        }

        return (

                <Card
                    border="partial" className={classNames(
                    cls.cardSkeleton,
                    {},
                    [cls[view]],
                )}
                >
                    <Skeleton width="100%" height="100%" />
                </Card>
        );
    },
);
