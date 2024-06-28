import {
    selectArticlesPageLimit,
} from 'pages/ArticlesPage/model/selectors/selectArticlesPageLimit/selectArticlesPageLimit';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Article, ArticlesView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import * as cls from './ArticleList.module.scss';
import { virtuosoStyleBig } from './virtuosoStyleOptions/virtuosoStyleBig';
import { virtuosoStyleSmall } from './virtuosoStyleOptions/virtuosoStyleSmall';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticlesView;
    target?: HTMLAttributeAnchorTarget;
    onScrollEnd?: () => void;
    virtuoso?: boolean;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticlesView.SMALL,
        isLoading,
        target,
        onScrollEnd,
        virtuoso = true,
    } = props;

    const { t } = useTranslation('articles');
    const limit = useAppSelector(selectArticlesPageLimit);

    const renderArticle = (
        article: Article,
    ) => <ArticleListItem article={article} view={view} key={article.id} target={target} />;

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text title={t('Статьи не найдены')} size={TextSize.XL} />
            </div>
        );
    }

    if (!virtuoso) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view], cls.recommendations])}>
                {articles.length > 0
                    ? articles.map(renderArticle)
                    : null}
            </div>
        );
    }

    if (view === ArticlesView.SMALL) {
        return (
            <>
                <VirtuosoGrid
                    data={articles}
                    useWindowScroll
                    endReached={onScrollEnd}
                    itemContent={(_, article) => renderArticle(article)}
                    components={virtuosoStyleSmall}
                />
                {isLoading && <Loader className={cls.loader} />}
            </>
        );
    }

    return (
        <>
            <Virtuoso
                data={articles}
                useWindowScroll
                endReached={onScrollEnd}
                increaseViewportBy={limit}
                itemContent={(_, article) => renderArticle(article)}
                components={virtuosoStyleBig}
            />
            {isLoading && <Loader className={cls.loader} />}
        </>
    );
});
