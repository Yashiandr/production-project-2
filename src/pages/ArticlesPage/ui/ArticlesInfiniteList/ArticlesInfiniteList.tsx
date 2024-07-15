import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleList } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { selectArticlesPageError } from '../../model/selectors/selectArticlesPageError/selectArticlesPageError';
import {
    selectArticlesPageIsLoading,
} from '../../model/selectors/selectArticlesPageIsLoading/selectArticlesPageIsLoading';
import { selectArticlePageView } from '../../model/selectors/selectArticlesPageView/selectArticlePageView';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { getArticles } from '../../model/slice/articlesPageSlice';
import { selectArticlesPageLimit } from '../../model/selectors/selectArticlesPageLimit/selectArticlesPageLimit';
import { ToggleFeatures } from '@/shared/lib/features';

export const ArticlesInfiniteList = memo(() => {
    const { t } = useTranslation('articles');
    const error = useAppSelector(selectArticlesPageError);
    const dispatch = useAppDispatch();
    const articles = useAppSelector(getArticles.selectAll);
    const limit = useAppSelector(selectArticlesPageLimit);
    const isLoading = useAppSelector(selectArticlesPageIsLoading);
    const view = useAppSelector(selectArticlePageView);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    if (error) {
        return (
            <ToggleFeatures
                feature="isAppRedesign"
                on={(
                    <Text
                        title={t('Не удалось загрузить статьи')}
                        variant="error"
                    />
                )}
                off={(
                    <TextDeprecated
                        title={t('Не удалось загрузить статьи')}
                        theme={TextTheme.ERROR}
                    />
                )}
            />

        );
    }
    return (
        <ArticleList
            onScrollEnd={onLoadNextPart}
            articles={articles}
            view={view}
            isLoading={isLoading}
            limit={limit}
        />
    );
});
