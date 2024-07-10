import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { selectArticlePageView } from '../../model/selectors/selectArticlesPageView/selectArticlePageView';
import { selectArticlesPageSort } from '../../model/selectors/selectArticlesPageSort/selectArticlesPageSort';
import { selectArticlesPageOrder } from '../../model/selectors/selectArticlesPageOrder/selectArticlesPageOrder';
import { selectArticlesPageSearch } from '../../model/selectors/selectArticlesPageSearch/selectArticlesPageSearch';
import { selectArticlesPageType } from '../../model/selectors/selectArticlesPageType/selectArticlesPageType';
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { ArticlesView, ArticleSortField, ArticleType } from '@/entities/Article';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import { SortOrder } from '@/shared/types/sort';
import { TabItem } from '@/shared/ui/deprecated/Tabs';

export function useArticlesFilter() {
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

    const onChangeView = useCallback(
        (newView: ArticlesView) => {
            dispatch(articlesPageActions.setView(newView));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(articlesPageActions.setOrder(newOrder));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSort = useCallback(
        (newSort: ArticleSortField) => {
            dispatch(articlesPageActions.setSort(newSort));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (newSearch: string) => {
            dispatch(articlesPageActions.setSearch(newSearch));
            dispatch(articlesPageActions.setPage(1));
            debouncedFetchData();
        },
        [dispatch, debouncedFetchData],
    );

    const onChangeType = useCallback(
        (tab: TabItem<ArticleType>) => {
            dispatch(articlesPageActions.setType(tab.value));
            dispatch(articlesPageActions.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    return {
        view,
        sort,
        order,
        search,
        type,
        onChangeView,
        onChangeOrder,
        onChangeSort,
        onChangeSearch,
        onChangeType,

    };
}
