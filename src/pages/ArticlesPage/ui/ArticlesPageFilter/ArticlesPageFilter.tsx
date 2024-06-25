import {
    ArticleSortField,
    ArticlesSortSelector,
    ArticlesView,
    ArticlesViewSelector,
    ArticleType,
} from 'entities/Article';
import { ArticlesTypeTab } from 'entities/Article/ui/ArticlesTypeTab/ArticlesTypeTab';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from 'shared/types';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { TabItem } from 'shared/ui/Tabs/Tabs';
import { selectArticlesPageOrder } from '../../model/selectors/selectArticlesPageOrder/selectArticlesPageOrder';
import { selectArticlesPageSearch } from '../../model/selectors/selectArticlesPageSearch/selectArticlesPageSearch';
import { selectArticlesPageSort } from '../../model/selectors/selectArticlesPageSort/selectArticlesPageSort';
import { selectArticlesPageType } from '../../model/selectors/selectArticlesPageType/selectArticlesPageType';
import { selectArticlePageView } from '../../model/selectors/selectArticlesPageView/selectArticlePageView';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import * as cls from './ArticlesPageFilter.module.scss';

interface ArticlesPageFilterProps {
    className?: string;
}

export const ArticlesPageFilter = memo((props: ArticlesPageFilterProps) => {
    const {
        className,
    } = props;
    const { t } = useTranslation('articles');
    const dispatch = useAppDispatch();
    const view = useAppSelector(selectArticlePageView);
    const sort = useAppSelector(selectArticlesPageSort);
    const order = useAppSelector(selectArticlesPageOrder);
    const search = useAppSelector(selectArticlesPageSearch);
    const type = useAppSelector(selectArticlesPageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeView = useCallback((newView: ArticlesView) => {
        dispatch(articlesPageActions.setView(newView));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageActions.setOrder(newOrder));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSort = useCallback((newSort: ArticleSortField) => {
        dispatch(articlesPageActions.setSort(newSort));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    const onChangeSearch = useCallback((newSearch: string) => {
        dispatch(articlesPageActions.setSearch(newSearch));
        dispatch(articlesPageActions.setPage(1));
        debouncedFetchData();
    }, [dispatch, debouncedFetchData]);

    const onChangeType = useCallback((tab: TabItem<ArticleType>) => {
        dispatch(articlesPageActions.setType(tab.value));
        dispatch(articlesPageActions.setPage(1));
        fetchData();
    }, [dispatch, fetchData]);

    return (
        <div className={classNames(cls.ArticlesPageFilter, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticlesSortSelector
                    sort={sort}
                    order={order}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticlesViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card>
                <Input placeholder={t('Поиск')} onChange={onChangeSearch} value={search} />
            </Card>
            <ArticlesTypeTab onChangeType={onChangeType} type={type} />
        </div>
    );
});