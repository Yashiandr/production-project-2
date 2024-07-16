import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleCreatePageContainer } from '../ArticleCreatePageContainer/ArticleCreatePageContainer';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleEditPageReducer } from '../../model/slice/articleEditPageSlice';

interface ArticleEditPage {
    className?: string;
}

const reducers: ReducerList = {
    articleEditPage: articleEditPageReducer,
};

const ArticleEditPage = (props: ArticleEditPage) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const isEdit = Boolean(id);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <ToggleFeatures
                feature="isAppRedesign"
                on={(
                    <Page className={classNames('', {}, [className])}>
                        {isEdit
                            ? `${t('ARTICLE EDIT PAGE')} c ID:${id}`
                            : <ArticleCreatePageContainer />}
                    </Page>
                )}
                off={(
                    <Page className={classNames('', {}, [className])}>
                        {isEdit
                            ? `${t('ARTICLE EDIT PAGE')} c ID:${id}`
                            : 'ARTICLE CREATE PAGE'}
                    </Page>
                )}
            />
        </DynamicModuleLoader>

    );
};

export default ArticleEditPage;
