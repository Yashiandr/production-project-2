import { memo, useCallback } from 'react';
import {
    ArticleBlock,
    ArticleBlockType,
    ArticleCodeBlock,
    ArticleImageBlock,
    ArticleTextBlock,
} from '@/entities/Article';
import { ArticleEditCodeBlock } from '../../../ArticleEditBlocks/ui/ArticleEditCodeBlock/ArticleEditCodeBlock';
import { ArticleEditImageBlock } from '../../../ArticleEditBlocks/ui/ArticleEditImageBlock/ArticleEditImageBlock';
import { ArticleEditTextBlock } from '../../../ArticleEditBlocks/ui/ArticleEditTextBlock/ArticleEditTextBlock';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleCreateBlock } from '../../../ArticleCreateBlock';
import * as cls from './ArticleCreatedBlock.module.scss';
import { Button } from '@/shared/ui/redesigned/Button';

interface ArticleCreatedBlocksProps {
    blocks: ArticleBlock[];
    updateBlock: (block: ArticleBlock) => void;
    addBlock: (block: ArticleBlock) => void;
    removeBlock: (id: string) => void
}

export const ArticleCreatedBlocks = memo((props: ArticleCreatedBlocksProps) => {
    const {
        blocks,
        updateBlock,
        addBlock,
        removeBlock,
    } = props;

    const onEditCode = useCallback((block: ArticleCodeBlock, code: string) => {
        updateBlock({ ...block, code });
    }, [updateBlock]);

    const onEditSrc = useCallback((block: ArticleImageBlock, src: string) => {
        updateBlock({ ...block, src });
    }, [updateBlock]);

    const onEditImageTitle = useCallback((block: ArticleImageBlock, title: string) => {
        updateBlock({ ...block, title });
    }, [updateBlock]);

    const onEditTextParagraphs = useCallback((block: ArticleTextBlock, paragraphs: string[]) => {
        updateBlock({ ...block, paragraphs });
    }, [updateBlock]);

    const onEditTextTitle = useCallback((block: ArticleTextBlock, title: string) => {
        updateBlock({ ...block, title });
    }, [updateBlock]);

    const onRemove = (id: string) => () => {
        removeBlock(id);
    };

    const renderBlock = (block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.CODE:
                return (
                    <ArticleEditCodeBlock block={block} onEditCode={onEditCode} key={block.id} />
                );
            case ArticleBlockType.IMAGE:
                return (
                    <ArticleEditImageBlock
                        block={block}
                        onEditSrc={onEditSrc}
                        onEditTitle={onEditImageTitle}
                        key={block.id}
                    />
                );
            case ArticleBlockType.TEXT:
                return (
                    <ArticleEditTextBlock
                        block={block}
                        onEditTextParagraphs={onEditTextParagraphs}
                        onEditTitle={onEditTextTitle}
                        key={block.id}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <VStack
            align="stretch"
            gap="16"
        >
            {blocks.map((block) => (
                <div className={cls.itemWrapper}>
                    <ArticleCreateBlock id={block.id} addBlock={addBlock} className={cls.addBtn} />
                    <Button onClick={onRemove(block.id)} variant="clear" className={cls.removeBtn}>-</Button>
                    {renderBlock(block)}
                </div>
            ))}
        </VStack>
    );
});
