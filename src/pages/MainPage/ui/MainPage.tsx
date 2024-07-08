import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { PageLoader } from '@/widgets/PageLoader';

function MainPage() {
    const { t } = useTranslation();

    return (
        <Page data-testid="MainPage">
            {t('Главная страница')}
            <PageLoader />
        </Page>
    );
}

export default MainPage;
