import { ReactElement, useCallback } from 'react';
import { AppRoutes } from '@/shared/const/router';
import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { useRouteChange } from '@/shared/router/useRouteChange';
import { ArticleCreateSaveToolbar } from '@/features/ArticleCreateSaveToolbar';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { addArticle, useArticleEditPageActions } from '@/pages/ArticleEditPage';

export function useAppToolbar() {
    const appRoute = useRouteChange();
    const dispatch = useAppDispatch();
    const { cancelEdit } = useArticleEditPageActions();
    const onSaveArticleEdit = useCallback(() => {
        dispatch(addArticle());
        console.log('я тут');
    }, [dispatch]);

    const onCancelArticleEdit = useCallback(() => {
        cancelEdit();
    }, [cancelEdit]);

    const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
        [AppRoutes.ARTICLES]: <ScrollToolbar />,
        [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
        [AppRoutes.MAIN]: <div>MAIN</div>,
        [AppRoutes.ABOUT]: <div>ABOUT</div>,
        [AppRoutes.ARTICLE_CREATE]: <ArticleCreateSaveToolbar
            onSave={onSaveArticleEdit}
            onCancel={onCancelArticleEdit}
        />,
    };

    return toolbarByAppRoute[appRoute];
}
