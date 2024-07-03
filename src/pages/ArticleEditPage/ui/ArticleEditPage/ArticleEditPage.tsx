import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

interface ArticleEditPage {
    className?: string;
}

const ArticleEditPage = (props: ArticleEditPage) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);

    return (
        <Page className={classNames('', {}, [className])}>
            {isEdit ? `${t('ARTICLE EDIT PAGE')} c ID:${id}` : ('ARTICLE CREATE PAGE')}
        </Page>
    );
};

export default ArticleEditPage;
