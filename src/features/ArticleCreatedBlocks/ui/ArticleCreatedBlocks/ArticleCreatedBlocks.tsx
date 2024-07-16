import { memo } from 'react';
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

interface ArticleCreatedBlocksProps {
    blocks: ArticleBlock[]
    updateBlock: (id: string, block: ArticleBlock) => void
}

export const ArticleCreatedBlocks = memo((props: ArticleCreatedBlocksProps) => {
    const {
        blocks,
        updateBlock,
    } = props;

    const onEditCode = (block: ArticleCodeBlock, code: string) => {
        updateBlock(block.id, { ...block, code });
    };

    const onEditSrc = (block: ArticleImageBlock, src: string) => {
        updateBlock(block.id, { ...block, src });
    };

    const onEditImageTitle = (block: ArticleImageBlock, title: string) => {
        updateBlock(block.id, { ...block, title });
    };

    const onEditTextParagraphs = (block: ArticleTextBlock, paragraphs: string[]) => {
        updateBlock(block.id, { ...block, paragraphs });
    };

    const onEditTextTitle = (block: ArticleTextBlock, title: string) => {
        updateBlock(block.id, { ...block, title });
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
            {blocks.map(renderBlock)}
        </VStack>
    );
});
