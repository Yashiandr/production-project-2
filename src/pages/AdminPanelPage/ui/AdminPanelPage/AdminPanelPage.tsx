import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import * as cls from './AdminPanelPage.module.scss';

interface AdminPanelPageProps {
    className?: string;
}

const AdminPanelPage = memo((props: AdminPanelPageProps) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Page
            data-testid="AdminPanelPage"
            className={classNames(cls.AdminPanelPage, {}, [className])}
        >
            {t('Панель администратора')}
        </Page>
    );
});

export default AdminPanelPage;
