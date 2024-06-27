import { ArticleList, ArticlesView } from 'entities/Article';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props;
    const { t } = useTranslation('articles');
    const { isLoading, data: articles = [], error } = useArticleRecommendationsList(3);

    if (error) {
        return <Text theme={TextTheme.ERROR} title={t('Невозможно загрузить рекомендации')} />;
    }

    return (
        <VStack align="stretch" gap="8" className={classNames('', {}, [className])}>
            <Text title={t('Рекомендуем')} size={TextSize.L} />
            <ArticleList
                view={ArticlesView.SMALL}
                recommendations
                target="_blank"
                articles={articles}
                isLoading={isLoading}
            />
        </VStack>
    );
});
