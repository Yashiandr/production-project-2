import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/deprecated/Button';
import { Page } from '../../Page';
import * as cls from './PageError.module.scss';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';

interface PageErrorProps {
    className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {
    const { t } = useTranslation();

    const { theme } = useTheme();

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };
    return (
        <Page
            className={classNames(cls.PageError, {}, [className, 'app', theme])}
        >
            <p>{t('Произошла непредвиденная ошибка')}</p>
            <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
        </Page>
    );
};
