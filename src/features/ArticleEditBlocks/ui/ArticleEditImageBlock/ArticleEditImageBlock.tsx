import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ArticleEditImageBlock.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { ArticleImageBlock } from '@/entities/Article';

interface ArticleEditImageBlockProps {
    className?: string;
    readonly?: boolean;
    block: ArticleImageBlock;
    onEditTitle?: (block: ArticleImageBlock, title: string) => void;
    onEditSrc?: (block: ArticleImageBlock, src: string) => void;
}

export const ArticleEditImageBlock = memo((props: ArticleEditImageBlockProps) => {
    const {
        className,
        block,
        onEditTitle,
        onEditSrc,
        readonly,
    } = props;
    const { t } = useTranslation('articles-edit');
    const [onCenter, setOnCenter] = useState(false);

    const onBlurTitle = () => {
        if (block.title) {
            setOnCenter(true);
        } else {
            setOnCenter(false);
        }
    };

    const onFocusTitle = () => {
        setOnCenter(false);
    };

    const onChangeSrc = (newSrc: string) => {
        onEditSrc?.(block, newSrc);
    };

    const onChangeTitle = (newTitle: string) => {
        onEditTitle?.(block, newTitle);
    };

    return (
        <VStack
            className={classNames(cls.ArticleEditImageBlock, {}, [
                className,
            ])}
        >

            <AppImage
                src={block.src}
                alt={block.title}
                style={{ maxWidth: '100%' }}
            />
            <Input
                className={classNames('', { [cls.center]: onCenter })}
                transparent
                value={block.title}
                onChange={onChangeTitle}
                readonly={readonly}
                placeholder={t('Название картинки')}
                onBlur={onBlurTitle}
                onFocus={onFocusTitle}
            />
            <Input
                transparent
                value={block.src}
                onChange={onChangeSrc}
                readonly={readonly}
                label={t('Ссылка')}
                placeholder={t('Укажите ссылку на изображение')}
            />
        </VStack>
    );
});
