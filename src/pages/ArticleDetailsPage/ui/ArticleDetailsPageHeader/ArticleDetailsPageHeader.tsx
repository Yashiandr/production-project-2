import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { Button } from 'shared/ui/Button/Button';
import { HStack } from 'shared/ui/Stack';
import { selectCanEditArticle } from '../../model/selectors/selectCanEditArticle/selectCanEditArticle';

interface ArticleDetailsPageHeaderProps {
    className?: string;
    id?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
    const {
        className,
        id,
    } = props;
    const { t } = useTranslation(['articles', 'translation']);
    const navigate = useNavigate();
    const canEdit = useAppSelector(selectCanEditArticle);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

    const onEdit = useCallback(() => {
        navigate(`${RoutePath.articles}/${id}/edit`);
    }, [navigate, id]);

    return (
        <HStack justify="between" className={classNames('', {}, [className])}>
            <Button onClick={onBackToList}>
                {t('Назад', { ns: 'translation' })}
            </Button>
            {canEdit && (
                <Button onClick={onEdit}>
                    {t('Редактировать')}
                </Button>
            )}
        </HStack>
    );
});
