import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import {
    Text,
    TextAlign,
} from '@/shared/ui/Text';
import { ArticleImageBlock } from '../../model/types/article';
import * as cls from './ArticleImageBlockComponent.module.scss';

interface ArticleImageBlockComponentProps {
    className?: string;
    block: ArticleImageBlock;
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const {
        className,
        block,
    } = props;
    return (
        <VStack className={classNames(cls.ArticleImageBlockComponent, {}, [className])}>
            <img src={block.src} alt={block.title} style={{ maxWidth: '100%' }} />
            {block.title && <Text text={block.title} align={TextAlign.CENTER} />}
        </VStack>
    );
});
