import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleList, ArticlesView } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className } = props;
        const { t } = useTranslation('articles');
        const {
            isLoading,
            data: articles = [],
            error,
        } = useArticleRecommendationsList(3);

        if (error) {
            return (
                <ToggleFeatures
                    feature="isAppRedesign" on={(
                    <Text
                        variant="error"
                        title={t('Невозможно загрузить рекомендации')}
                    />
                )} off={(
                    <TextDeprecated
                        theme={TextTheme.ERROR}
                        title={t('Невозможно загрузить рекомендации')}
                    />
                )}
                />

            );
        }

        return (
            <VStack
                data-testid="ArticleRecommendationsList"
                align="stretch"
                gap="8"
                className={classNames('', {}, [className])}
            >
                <ToggleFeatures
                    feature="isAppRedesign"
                    on={
                        <Text title={t('Рекомендуем')} size="l" />
                    }
                    off={
                        <TextDeprecated title={t('Рекомендуем')} size={TextSize.L} />
                    }
                />
                <ArticleList
                    view={ArticlesView.SMALL}
                    virtuoso={false}
                    target="_blank"
                    articles={articles}
                    isLoading={isLoading}
                />
            </VStack>
        );
    },
);
