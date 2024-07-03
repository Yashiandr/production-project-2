import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleList } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Text, TextTheme } from '@/shared/ui/Text/Text';
import { selectArticlesPageError } from '../../model/selectors/selectArticlesPageError/selectArticlesPageError';
import {
    selectArticlesPageIsLoading,
} from '../../model/selectors/selectArticlesPageIsLoading/selectArticlesPageIsLoading';
import { selectArticlePageView } from '../../model/selectors/selectArticlesPageView/selectArticlePageView';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { getArticles } from '../../model/slice/articlesPageSlice';

export const ArticlesInfiniteList = memo(() => {
    const { t } = useTranslation('articles');
    const error = useAppSelector(selectArticlesPageError);
    const dispatch = useAppDispatch();
    const articles = useAppSelector(getArticles.selectAll);
    const isLoading = useAppSelector(selectArticlesPageIsLoading);
    const view = useAppSelector(selectArticlePageView);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    if (error) {
        return <Text title={t('Не удалось загрузить статьи')} theme={TextTheme.ERROR} />;
    }
    return (
        <ArticleList
            onScrollEnd={onLoadNextPart}
            articles={articles}
            view={view}
            isLoading={isLoading}
        />
    );
});
