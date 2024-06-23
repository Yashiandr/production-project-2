import { ArticleDetails, ArticleList, ArticlesView } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { AddCommentForm } from 'features/AddNewComment';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { Page } from 'widgets/Page';
import {
    selectArticleDetailsCommentsIsLoading,
} from '../../model/selectors/comments/selectArticleDetailsCommentsIsLoading/articleDetailsCommentsIsLoading';
import {
    selectArticleDetailsPageRecommendationsIsLoading,
} from '../../model/selectors/recommendations/selectArticleDetailsPageRecommendationsIsLoading';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import {
    fetchArticleRecommendations,
} from '../../model/services/fetchArticleRecommendations/fetchArticleRecommendations';
import { fetchCommentsArticleById } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import {
    articleDetailsPageRecommendationsReducer,
    getArticleRecommendations,
} from '../../model/slice/articleDetailsPageRecommendationsSlice';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import * as cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducerList = {
    articleDetailsComments: articleDetailsCommentsReducer,
    articleDetailsRecommendations: articleDetailsPageRecommendationsReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation(['articles', 'translation']);
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const comments = useAppSelector(getArticleComments.selectAll);
    const commentsIsLoading = useAppSelector(selectArticleDetailsCommentsIsLoading);
    const recommendations = useAppSelector(getArticleRecommendations.selectAll);
    const recommendationsIsLoading = useAppSelector(selectArticleDetailsPageRecommendationsIsLoading);

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(fetchCommentsArticleById(id));
        dispatch(fetchArticleRecommendations());
    });

    if (!id && __PROJECT__ !== 'storybook') {
        return (
            <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
                <ArticleDetailsPageHeader id={id!} />
                <ArticleDetails id={id!} />
                <Text title={t('Рекомендуем')} size={TextSize.L} />
                <ArticleList
                    articles={recommendations}
                    isLoading={recommendationsIsLoading}
                    view={ArticlesView.SMALL}
                    className={cls.recommendations}
                    target="_blank"
                />
                <Text title={t('Комментарии')} />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    comments={comments}
                    isLoading={commentsIsLoading}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
