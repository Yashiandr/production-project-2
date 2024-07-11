import { memo } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { Text as TextRedesigned } from '@/shared/ui/redesigned/Text';
import { ArticleTextBlock } from '../../model/types/article';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleTextBlockComponentProps {
    className?: string;
    block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = memo(
    (props: ArticleTextBlockComponentProps) => {
        const { className, block } = props;

        return (
            <VStack
                align="start"
                gap="16"
                className={classNames('', {}, [className])}
            >
                {block.title && (
                    <ToggleFeatures
                        feature="isAppRedesign"
                        on={<TextRedesigned title={block.title} size="s" bold />}
                        off={<TextDeprecated title={block.title} size={TextSize.S} />}
                    />
                )}
                {block.paragraphs.map((paragraph) => (
                    <ToggleFeatures
                        feature="isAppRedesign"
                        on={<TextRedesigned text={paragraph} key={paragraph} />}
                        off={<TextDeprecated text={paragraph} key={paragraph} />}
                    />
                ))}
            </VStack>
        );
    },
);
