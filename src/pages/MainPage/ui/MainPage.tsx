import { useTranslation } from 'react-i18next';
import { ListBox } from 'shared/ui/ListBox/ListBox';
import { Page } from 'widgets/Page';
import { PageLoader } from 'widgets/PageLoader';

function MainPage() {
    const { t } = useTranslation();

    return (
        <Page>
            {t('Главная страница')}
            <ListBox
                defaultValue="Выберите значение"
                /* eslint-disable-next-line */
                onChange={(value: string) => {
                }}
                value={undefined}
                items={[
                    { value: '1', content: '123' },
                    { value: '2', content: '1sdasd' },
                    { value: '3', content: '12asdd3', disabled: true },
                ]}
            />
            <PageLoader />
        </Page>
    );
}

export default MainPage;
