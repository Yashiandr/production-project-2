import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Text, TextSize } from '@/shared/ui/deprecated/Text';
import { ArticlesView } from '../../model/consts/consts';
import { Article } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import * as cls from './ArticleList.module.scss';
import { virtuosoStyleBig } from './virtuosoStyleOptions/virtuosoStyleBig';
import { virtuosoStyleSmall } from './virtuosoStyleOptions/virtuosoStyleSmall';
import { ViewCardGesture } from '@/shared/ui/deprecated/ViewCardGesture';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticlesView;
    target?: HTMLAttributeAnchorTarget;
    onScrollEnd?: () => void;
    virtuoso?: boolean;
    limit?: number;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticlesView.SMALL,
        isLoading,
        target,
        onScrollEnd,
        limit,
        virtuoso = true,
    } = props;

    const { t } = useTranslation('articles');

    const renderArticle = (article: Article) => (
        <ArticleListItem
            article={article}
            view={view}
            key={article.id}
            target={target}
        />
    );

    if (!isLoading && !articles.length) {
        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Text title={t('Статьи не найдены')} size={TextSize.XL} />
            </div>
        );
    }

    if (!virtuoso) {
        return articles.length > 0 ? (
                <>
                    <BrowserView>
                        <div
                            data-testid="ArticleList"
                            className={classNames(cls.ArticleList, {}, [
                                className,
                                cls[view],
                                cls.recommendations,
                            ])}
                        >
                            {articles.map(renderArticle)}
                        </div>
                    </BrowserView>
                    <MobileView>
                        <div
                            data-testid="ArticleList"
                            className={classNames(cls.recommendationsMobile, {}, [
                                className,
                            ])}
                        >
                            <ViewCardGesture cards={articles.map(renderArticle)} />
                        </div>
                    </MobileView>
                </>
            ) : null;
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
