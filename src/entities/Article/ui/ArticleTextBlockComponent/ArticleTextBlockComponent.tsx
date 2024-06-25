import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const {
        className,
        block,
    } = props;

    return (
        <VStack align="start" gap="16" className={classNames('', {}, [className])}>
            {block.title && (
                <Text title={block.title} size={TextSize.M} />
            )}
            {block.paragraphs.map((paragraph) => (
                <Text key={paragraph} text={paragraph} />
            ))}
        </VStack>
    );
});
