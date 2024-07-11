import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { Page } from '@/widgets/Page';
import { articleDetailsCommentsReducer } from '../../model/slice/articleDetailsCommentsSlice';
import { articleDetailsPageRecommendationsReducer } from '../../model/slice/articleDetailsPageRecommendationsSlice';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import * as cls from './ArticleDetailsPage.module.scss';
import { ArticleRating } from '@/features/articleRating';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/deprecated/Card';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducerList = {
    articleDetailsComments: articleDetailsCommentsReducer,
    articleDetailsRecommendations: articleDetailsPageRecommendationsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation('articles');
    const { id = '#' } = useParams<{ id: string }>();

    if (!id) {
        return (
            <div
                className={classNames(cls.ArticleDetailsPage, {}, [className])}
            >
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeatures
                feature="isAppRedesign"
                on={(
                    <StickyContentLayout
                        content={(
                            <Page
                                className={classNames(cls.ArticleDetailsPage, {}, [className])}
                            >
                                <DetailsContainer />
                                <ArticleRating articleId={id} />
                                <ArticleRecommendationsList />
                                <ArticleDetailsComments id={id} />
                            </Page>
                        )}
                        right={<AdditionalInfoContainer />}
                    />
                )}
                off={(
                    <Page
                        className={classNames(cls.ArticleDetailsPage, {}, [className])}
                    >
                        <ArticleDetailsPageHeader id={id} />
                        <ArticleDetails id={id} />
                        <ToggleFeatures
                            feature="isArticleRatingEnable"
                            on={<ArticleRating articleId={id} />}
                            off={<Card>{t('Скоро появится возможность оценки статей')}</Card>}
                        />
                        <ArticleRecommendationsList />
                        <ArticleDetailsComments id={id} />
                    </Page>
                )}
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
