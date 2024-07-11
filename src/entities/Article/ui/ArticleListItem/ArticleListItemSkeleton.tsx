import { memo } from 'react';
import { ArticlesView } from '../../model/consts/consts';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleListItemSkeletonRedesigned } from './ArticleListItemRedesigned/ArticleListItemSkeletonRedesigned';
import { ArticleListItemSkeletonDeprecated } from './ArticlesListItemDeprecated/ArticleListItemSkeletonDeprecated';

export interface ArticleListItemSkeletonProps {
    view: ArticlesView;
}

export const ArticleListItemSkeleton = memo(
    ({ view }: ArticleListItemSkeletonProps) => (
        <ToggleFeatures
            feature="isAppRedesign"
            on={<ArticleListItemSkeletonRedesigned view={view} />}
            off={<ArticleListItemSkeletonDeprecated view={view} />}
        />
    ),
);
