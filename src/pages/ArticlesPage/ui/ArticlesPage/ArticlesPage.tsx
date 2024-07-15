import { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Page } from '@/widgets/Page';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';

import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList';
import { ArticlesPageFilter } from '../ArticlesPageFilter/ArticlesPageFilter';
import * as cls from './ArticlesPage.module.scss';
import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { ToggleFeatures } from '@/shared/lib/features';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';
import { FilterContainer } from '../FilterContainer/FilterContainer';
import { MobileContentLayout } from '@/shared/layouts/MobileContentLayout';
import { ArticlesSearch } from '@/features/ArticlesSearch';
import { useArticlesFilter } from '../../lib/hooks/useArticlesFilter';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = (props: ArticlesPageProps) => {
    const { className } = props;
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        dispatch(initArticlesPage(searchParams));
    });

    const { search, onChangeSearch } = useArticlesFilter();

    const content = (
        <ToggleFeatures
            feature="isAppRedesign"
            on={(
                <>
                    <BrowserView>
                        <StickyContentLayout
                            content={(
                                <Page
                                    data-testid="ArticlesPage"
                                    className={classNames('', {}, [className])}
                                >
                                    <ArticlesInfiniteList />
                                    <ArticlePageGreeting />
                                </Page>
                            )}
                            left={<ViewSelectorContainer />}
                            right={<FilterContainer />}
                        />
                    </BrowserView>
                    <MobileView>
                        <MobileContentLayout
                            content={(
                                <Page
                                    data-testid="ArticlesPage"
                                    className={classNames('', {}, [className])}
                                >
                                    <ArticlesInfiniteList />
                                    <ArticlePageGreeting />
                                </Page>
                            )}
                            header={(
                                <>
                                    <ArticlesSearch onChangeSearch={onChangeSearch} search={search} />
                                    <ViewSelectorContainer />
                                </>
                            )}
                            headerSticky
                            popoverContent={<FilterContainer />}
                        />
                    </MobileView>
                </>

            )}
            off={(
                <Page
                    data-testid="ArticlesPage"
                    className={classNames(cls.ArticlesPageDeprecated, {}, [className])}
                >
                    <ArticlesPageFilter />
                    <ArticlesInfiniteList />
                    <ArticlePageGreeting />
                </Page>
            )}
        />
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            {content}
        </DynamicModuleLoader>
    );
};

export default memo(ArticlesPage);
