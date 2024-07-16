import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
// import * as cls from './ArticleCreateTitle.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';

interface ArticleCreateTitleProps {
    className?: string;
    onChangeTitle: (value: string) => void;
    title?: string;
    onChangeSubtitle: (value: string) => void;
    subtitle?: string;
}

export const ArticleCreateTitle = memo((props: ArticleCreateTitleProps) => {
    const {
        className,
        onChangeTitle,
        onChangeSubtitle,
        title,
        subtitle,
    } = props;
    const { t } = useTranslation('articles-edit');
    return (
        <>
            <Input
                className={classNames('', {}, [className])}
                onChange={onChangeTitle}
                value={title}
                transparent
                placeholder={t('Заголовок')}
                size="xl"
                autofocus
            />
            <Input
                className={classNames('', {}, [className])}
                onChange={onChangeSubtitle}
                value={subtitle}
                transparent
                placeholder={t('Подзаголовок')}
                size="l"
                bold
            />
        </>

    );
});
