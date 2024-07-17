import { memo } from 'react';
import { TextareaInput } from '@/shared/ui/redesigned/TextareaInput';
import { ArticleCodeBlock } from '@/entities/Article';

interface ArticleCodeBlockComponentProps {
    className?: string;
    readonly?: boolean;
    block: ArticleCodeBlock;
    onEditCode?: (block: ArticleCodeBlock, code: string) => void;
}

export const ArticleEditCodeBlock = memo(
    (props: ArticleCodeBlockComponentProps) => {
        const { className, block, readonly, onEditCode } = props;

        const onChange = (newCode: string) => {
            onEditCode?.(block, newCode);
        };

        return (
            <TextareaInput
                wrap="hard"
                className={className}
                value={block.code}
                onChange={onChange}
                variant="code"
                readonly={readonly}
            />
        );
    },
);
