import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card';
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { ArticlesView } from '../../model/consts/consts';
import * as cls from './ArticleListItem.module.scss';
import { toggleFeatures } from '@/shared/lib/features';

interface ArticleListItemSkeletonProps {
    view: ArticlesView;
}

export const ArticleListItemSkeleton = memo(
    ({ view }: ArticleListItemSkeletonProps) => {
        const Skeleton = toggleFeatures({
            name: 'isAppRedesign',
            on: () => SkeletonRedesigned,
            off: () => SkeletonDeprecated,
        });

        const Card = toggleFeatures({
            name: 'isAppRedesign',
            on: () => CardRedesigned,
            off: () => CardDeprecated,
        });

        const views = (
            <div className={cls.viewersWrapper}>
                <Skeleton width={32} height={32} border="10%" />
                <Skeleton width={38} height={24} />
            </div>
        );
        const types = <Skeleton width={130} height={24} />;

        if (view === ArticlesView.BIG) {
            return (
                <div
                    className={classNames(cls.ArticleListItem, {}, [cls[view]])}
                >
                    <Card className={cls.card}>
                        <div className={cls.header}>
                            <div className={cls.avatarWrapper}>
                                <Skeleton width={30} height={30} border="50%" />
                                <Skeleton width={400} height={32} />
                            </div>
                            <div className={cls.userWrapper}>
                                <Skeleton width={50} height={24} />
                                <Skeleton width={70} height={24} />
                            </div>
                        </div>
                        {types}
                        <Skeleton width="100%" height={240} />
                        <Skeleton width="100%" height={200} />
                        <div className={cls.footer}>
                            <Skeleton width={120} height={32} />
                            {views}
                        </div>
                    </Card>
                </div>
            );
        }

        return (
            <div className={classNames(cls.ArticleListItem, {}, [cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Skeleton width={208} height={208} />
                    </div>
                    <div className={cls.infoWrapper}>
                        {types}
                        {views}
                    </div>
                    <Skeleton width={208} height={24} />
                </Card>
            </div>
        );
    },
);
