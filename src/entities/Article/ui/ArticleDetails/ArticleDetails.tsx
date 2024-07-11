import { memo } from 'react';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ToggleFeatures } from '@/shared/lib/features';
import { ArticleDetailsRedesigned } from './ArticleDetailsRedesigned/ArticleDetailsRedesigned';
import { ArticleDetailsDeprecated } from './ArticleDetailsDeprecated/ArticleDetailsDeprecated';

export interface ArticleDetailsProps {
    className?: string;
    id: string;
}

const reducers: ReducerList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => (
    <DynamicModuleLoader reducers={reducers}>
        <ToggleFeatures
            feature="isAppRedesign"
            on={<ArticleDetailsRedesigned {...props} />}
            off={<ArticleDetailsDeprecated {...props} />}
        />
    </DynamicModuleLoader>
));
