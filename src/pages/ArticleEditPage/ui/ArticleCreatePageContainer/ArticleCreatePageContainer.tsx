import { memo, useCallback } from 'react';
import { ArticleCreateTitle } from '@/features/ArticleCreateTitle';
import {
    useSelectArticleEditPageTitle,
    useSelectArticleEditPageSubtitle,
    useSelectArticleEditPageImg,
    useSelectArticleEditTypes,
} from '../../model/selectors/selectArticleEditPage/selectArticleEditPageData';
import { useArticleEditPageActions, getArticleBlocks } from '../../model/slice/articleEditPageSlice';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { ArticleCreatedBlocks } from '@/features/ArticleCreatedBlocks';
import { ArticleBlock, ArticleType } from '@/entities/Article';
import { ArticleCreateBlock } from '@/features/ArticleCreateBlock';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ArticleCreateToolbar } from '@/features/ArticleCreateToolbar';
import { Page } from '@/widgets/Page';
import { TabItem } from '@/shared/ui/redesigned/Tabs';

export const ArticleCreatePageContainer = memo(() => {
    const title = useSelectArticleEditPageTitle();
    const subtitle = useSelectArticleEditPageSubtitle();
    const articleImg = useSelectArticleEditPageImg();
    const types = useSelectArticleEditTypes();
    const {
        setTitle,
        setSubtitle,
        setType,
        blockAdded,
        blockUpdate,
        blockInsert,
        blockRemove,
        setImage,
        removeType,
    } = useArticleEditPageActions();
    const blocks = useAppSelector(getArticleBlocks.selectAll);
    const addType = useCallback((type: ArticleType) => {
        setType(type);
    }, [setType]);

    const addBlock = useCallback((block: ArticleBlock) => {
        blockAdded(block);
    }, [blockAdded]);

    const updateBlock = useCallback((block: ArticleBlock) => {
        blockUpdate({ ...block });
    }, [blockUpdate]);

    const onRemoveType = useCallback((tab: TabItem<ArticleType>) => {
        removeType(tab.value);
    }, [removeType]);

    const content = (
        <Page>
            <ArticleCreateTitle
                types={types}
                onRemoveType={onRemoveType}
                title={title}
                onChangeTitle={setTitle}
                subtitle={subtitle}
                onChangeSubtitle={setSubtitle}
                img={articleImg}
            />
            <ArticleCreatedBlocks
                updateBlock={updateBlock} addBlock={blockInsert} blocks={blocks}
                removeBlock={blockRemove}
            />
            <ArticleCreateBlock id={String(blocks.length + 1)} addBlock={addBlock} last />
        </Page>
    );

    return (
        <StickyContentLayout
            content={content}
            right={(
                <ArticleCreateToolbar
                    types={types}
                    addType={addType}
                    id={String(blocks.length + 1)}
                    addBlock={addBlock}
                    img={articleImg}
                    addImage={setImage}
                />
            )}
        />
    );
});
