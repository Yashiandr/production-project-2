import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isBrowser } from 'react-device-detect';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { Card } from '@/shared/ui/redesigned/Card';
import { useSelectArticleDetailsData, useSelectArticleDetailsIsLoading } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ArticleAdditionalContainer.module.scss';
import { getRouteArticleEdit } from '@/shared/const/router';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';

interface AdditionalInfoContainerProps {
    className?: string;
}

export const AdditionalInfoContainer = memo((props: AdditionalInfoContainerProps) => {
    const {
        className,
    } = props;
    const article = useSelectArticleDetailsData();
    const isLoading = useSelectArticleDetailsIsLoading();

    const navigate = useNavigate();

    const onEdit = useCallback(() => {
        if (article?.id) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [navigate, article]);

    const view = isBrowser ? 'browser' : 'mobile';

    if (isLoading) {
        return (
            <Card className={classNames(cls.card, {}, [className, cls[view]])} border="round">
                <Skeleton width="100%" height="182px" />
            </Card>
        );
    }
    if (!article) {
        return null;
    }

    return (
        <Card padding="24" className={classNames(cls.card, {}, [className, cls[view]])} border="round">
            <ArticleAdditionalInfo
                onEdit={onEdit} author={article.user} createdAt={article.createdAt}
                views={article.views}
            />
        </Card>
    );
});
