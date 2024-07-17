import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ArticleCreateSaveToolbar.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface ArticleCreateSaveToolbarProps {
    className?: string;
    onSave?: () => void;
    onCancel?: () => void;
}

export const ArticleCreateSaveToolbar = memo((props: ArticleCreateSaveToolbarProps) => {
    const {
        className,
        onSave,
        onCancel,
    } = props;
    const { t } = useTranslation();

    return (
        <VStack align="stretch" gap="8" className={classNames(cls.ArticleCreateSaveToolbar, {}, [className])}>
            <Button onClick={onSave}>{t('Сохранить')}</Button>
            <Button color="error" onClick={onCancel}>{t('Отменить')}</Button>
        </VStack>
    );
});
