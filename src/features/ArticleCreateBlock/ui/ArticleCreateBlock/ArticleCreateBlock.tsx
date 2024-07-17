import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { isBrowser } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ArticleCreateBlock.module.scss';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleBlock, ArticleBlockType } from '@/entities/Article';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Button } from '@/shared/ui/redesigned/Button';

interface ArticleCreateBlockProps {
    className?: string;
    addBlock: (block: ArticleBlock) => void;
    id: string;
    last?: boolean;
    text?: string;
    withBorder?: boolean;
}

export const ArticleCreateBlock = memo((props: ArticleCreateBlockProps) => {
    const {
        className,
        addBlock,
        id,
        last,
        text = '+',
        withBorder,
    } = props;
    const { t } = useTranslation('articles-edit');

    const onCreateCodeBlock = () => {
        addBlock({
            type: ArticleBlockType.CODE,
            code: '',
            id: String(id),
        });
    };

    const onCreateImageBlock = () => {
        addBlock({
            type: ArticleBlockType.IMAGE,
            src: '',
            id: String(id),
            title: '',
        });
    };

    const onCreateTextBlock = () => {
        addBlock({
            type: ArticleBlockType.TEXT,
            paragraphs: [],
            title: '',
            id: String(id),
        });
    };

    const items = [
        {
            content: t('код'),
            onClick: () => onCreateCodeBlock(),
        },
        {
            content: t('изображение'),
            onClick: () => onCreateImageBlock(),
        },
        {
            content: t('текст'),
            onClick: () => onCreateTextBlock(),
        },
    ];

    const trigger = last
        ? <VStack className={cls.addLastBtn} justify="center"> +</VStack>
        : <Button variant={withBorder ? 'outline' : 'clear'}>{text}</Button>;

    return (
        <HStack
            max
            className={classNames(cls.ArticleCreateBlock, {}, [className])}
        >
            <Dropdown
                trigger={trigger}
                direction={isBrowser ? 'top' : 'top start'}
                gap={isBrowser ? -146 : 0}
                items={items}
                fullWidth={last}
                className={last ? cls.lastBtnWrapper : undefined}
            />
        </HStack>
    );
});
