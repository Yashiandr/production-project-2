import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Article, ArticlesView } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import * as cls from './ArticleList.module.scss';

interface ArticleListProps {
    className?: string;
    articles: Article[];
    isLoading?: boolean;
    view?: ArticlesView;
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticlesView.SMALL,
        isLoading,
    } = props;

    const { t } = useTranslation('articles');

    const renderArticle = (article: Article) => (
        <ArticleListItem article={article} view={view} key={article.id} />
    );

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text title={t('Статьи не найдены')} size={TextSize.XL} />
            </div>
        );
    }

    return (
        <>
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                {articles.length > 0
                    ? articles.map(renderArticle)
                    : null}

            </div>
            {isLoading && <Loader className={cls.loader} />}
        </>
    );
});
