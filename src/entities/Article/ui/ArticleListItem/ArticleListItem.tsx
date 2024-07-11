import { HTMLAttributeAnchorTarget, memo } from 'react';
import { ArticlesView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleListItemDeprecated } from './ArticlesListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticlesView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => (
    <ToggleFeatures
        feature="isAppRedesign"
        on={<ArticleListItemRedesigned {...props} />}
        off={(
            <ArticleListItemDeprecated {...props} />
        )}
    />
));
