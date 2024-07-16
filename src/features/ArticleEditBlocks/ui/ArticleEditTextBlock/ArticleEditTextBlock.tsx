import { useTranslation } from 'react-i18next';
import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleTextBlock } from '@/entities/Article';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Input } from '@/shared/ui/redesigned/Input';
import { TextareaInput } from '@/shared/ui/redesigned/TextareaInput';

interface ArticleEditTextBlockProps {
    className?: string;
    block: ArticleTextBlock;
    onEditTextParagraphs: (block: ArticleTextBlock, paragraphs: string[]) => void;
    onEditTitle?: (block: ArticleTextBlock, title: string) => void;
    readonly?: boolean;
}

const paragraphsToText = (paragraphs: string[]) => paragraphs.join('\n\n');
const textToParagraphs = (text: string) => text.split('\n\n');

export const ArticleEditTextBlock = memo((props: ArticleEditTextBlockProps) => {
    const {
        className,
        block,
        onEditTextParagraphs,
        onEditTitle,
        readonly,
    } = props;
    const { t } = useTranslation('articles-edit');
    const [paragraphsText, setParagraphsText] = useState(paragraphsToText(block.paragraphs));

    const onChangeTextParagraphs = () => {
        onEditTextParagraphs?.(block, textToParagraphs(paragraphsText));
    };

    const onChangeTitle = (newTitle: string) => {
        onEditTitle?.(block, newTitle);
    };

    return (
        <VStack
            align="start"
            gap="16"
            className={classNames('', {}, [className])}
        >
            <Input
                value={block.title}
                onChange={onChangeTitle}
                transparent
                readonly={readonly}
                bold
                placeholder={t('Укажите заголовок текста')}
            />
            <TextareaInput
                value={paragraphsText}
                onChange={setParagraphsText}
                readonly={readonly}
                variant="transparent"
                placeholder={t('Введите текст')}
                onBlur={onChangeTextParagraphs}
            />
        </VStack>
    );
});
