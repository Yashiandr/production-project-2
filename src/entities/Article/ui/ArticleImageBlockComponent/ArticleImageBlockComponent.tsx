import { memo } from 'react';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text as TextDeprecated, TextAlign } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { ArticleImageBlock } from '../../model/types/article';
import * as cls from './ArticleImageBlockComponent.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo(
    (props: ArticleImageBlockComponentProps) => {
        const { className, block } = props;
        return (
            <VStack
                className={classNames(cls.ArticleImageBlockComponent, {}, [
                    className,
                ])}
            >
                <img
                    src={block.src}
                    alt={block.title}
                    style={{ maxWidth: '100%' }}
                />
                {block.title && (
                    <ToggleFeatures
                        feature="isAppRedesign"
                        on={<Text align="center" text={block.title} />}
                        off={<TextDeprecated text={block.title} align={TextAlign.CENTER} />}
                    />
                )}
            </VStack>
        );
    },
);
