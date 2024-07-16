import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { isBrowser } from 'react-device-detect';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ArticleCreateBlock.module.scss';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ArticleBlock, ArticleBlockType } from '@/entities/Article';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleCreateBlockProps {
    className?: string;
    addBlock: (block: ArticleBlock) => void;
}

export const ArticleCreateBlock = memo((props: ArticleCreateBlockProps) => {
    const {
        className,
        addBlock,
    } = props;
    const { t } = useTranslation('articles-edit');
    const [id, setId] = useState(2);

    const onCreateCodeBlock = () => {
        addBlock({
            type: ArticleBlockType.CODE,
            code: '',
            id: String(id),
        });
        setId((prevState) => prevState + 1);
    };

    const onCreateImageBlock = () => {
        addBlock({
            type: ArticleBlockType.IMAGE,
            src: '',
            id: String(id),
            title: '',
        });
        setId((prevState) => prevState + 1);
    };

    const onCreateTextBlock = () => {
        addBlock({
            type: ArticleBlockType.TEXT,
            paragraphs: [],
            title: '',
            id: String(id),
        });
        setId((prevState) => prevState + 1);
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

    return (
        <HStack
            max
            className={classNames(cls.ArticleCreateBlock, {}, [className])}
        >
            <Dropdown
                trigger={<Text text="+" align="center" />}
                direction={isBrowser ? 'bottom start' : 'top start'}
                items={items}
            />
        </HStack>
    );
});
