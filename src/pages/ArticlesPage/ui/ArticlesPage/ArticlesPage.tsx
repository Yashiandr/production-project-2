import { ArticleList, ArticlesView, ArticlesViewSelector } from 'entities/Article';
import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from 'shared/ui/Page/Page';
import { PageError } from 'widgets/PageError';
import { selectArticlesPageError } from '../../model/selectors/selectArticlesPageError/selectArticlesPageError';
import {
    selectArticlesPageIsLoading,
} from '../../model/selectors/selectArticlesPageIsLoading/selectArticlesPageIsLoading';
import { selectArticlePageView } from '../../model/selectors/selectArticlesPageView/selectArticlePageView';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slice/articlesPageSlice';
import * as cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const {
        className,
    } = props;
    const dispatch = useAppDispatch();
    const articles = useAppSelector(getArticles.selectAll);
    const isLoading = useAppSelector(selectArticlesPageIsLoading);
    const view = useAppSelector(selectArticlePageView);
    const error = useAppSelector(selectArticlesPageError);

    const onChangeView = useCallback((newView: ArticlesView) => {
        dispatch(articlesPageActions.setView(newView));
    }, [dispatch]);

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useInitialEffect(() => {
        dispatch(initArticlesPage());
    });

    if (error) {
        return <PageError />;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <Page onScrollEnd={onLoadNextPart} className={classNames(cls.ArticlesPage, {}, [className])}>
                <ArticlesViewSelector view={view} onViewClick={onChangeView} />
                <ArticleList
                    articles={articles}
                    view={view}
                    isLoading={isLoading}
                />
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
