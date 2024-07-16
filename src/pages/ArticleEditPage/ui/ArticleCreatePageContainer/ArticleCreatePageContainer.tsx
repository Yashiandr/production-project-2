import { memo } from 'react';
import { ArticleCreateTitle } from '@/features/ArticleCreateTitle';
import {
    useSelectArticleEditPageTitle,
    useSelectArticleEditPageSubtitle,
} from '../../model/selectors/selectArticleEditPage/selectArticleEditPageData';
import { useArticleEditPageActions, getArticleBlocks } from '../../model/slice/articleEditPageSlice';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { ArticleCreatedBlocks } from '@/features/ArticleCreatedBlocks';
import { ArticleBlock } from '@/entities/Article';
import { ArticleCreateBlock } from '@/features/ArticleCreateBlock';

export const ArticleCreatePageContainer = memo(() => {
    const title = useSelectArticleEditPageTitle();
    const subtitle = useSelectArticleEditPageSubtitle();
    const { setTitle, setSubtitle, blockAdded, blockUpdate } = useArticleEditPageActions();
    const blocks = useAppSelector(getArticleBlocks.selectAll);
    const addBlock = (block: ArticleBlock) => {
        blockAdded(block);
    };

    const updateBlock = (id: string, block: ArticleBlock) => {
        blockUpdate({ ...block });
    };

    return (
        <>
             <ArticleCreateTitle
                 title={title}
                 onChangeTitle={setTitle}
                 subtitle={subtitle}
                 onChangeSubtitle={setSubtitle}
             />
             <ArticleCreatedBlocks updateBlock={updateBlock} blocks={blocks} />
             <ArticleCreateBlock addBlock={addBlock} />
        </>
    );
});
