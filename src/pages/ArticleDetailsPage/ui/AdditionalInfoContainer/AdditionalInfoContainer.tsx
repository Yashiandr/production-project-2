import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { Card } from '@/shared/ui/redesigned/Card';
import { useSelectArticleDetailsData } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ArticleAdditionalContainer.module.scss';
import { getRouteArticleEdit } from '@/shared/const/router';

interface AdditionalInfoContainerProps {
    className?: string;
}

export const AdditionalInfoContainer = memo((props: AdditionalInfoContainerProps) => {
    const {
        className,
    } = props;
    const article = useSelectArticleDetailsData();

    const navigate = useNavigate();

    const onEdit = useCallback(() => {
        if (article?.id) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [navigate, article]);

    if (!article) {
        return null;
    }

    return (
        <Card padding="24" className={classNames(cls.card, {}, [className])} border="round">
            <ArticleAdditionalInfo onEdit={onEdit} author={article.user} createdAt={article.createdAt} views={article.views} />
        </Card>
    );
});
