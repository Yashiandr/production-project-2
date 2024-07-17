import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ArticleCreateTitle.module.scss';
import { Input } from '@/shared/ui/redesigned/Input';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { ArticleType } from '@/entities/Article';
import { Tabs, TabItem } from '@/shared/ui/redesigned/Tabs';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleCreateTitleProps {
    className?: string;
    onChangeTitle: (value: string) => void;
    title?: string;
    onChangeSubtitle: (value: string) => void;
    subtitle?: string;
    img?: string;
    types?: ArticleType[];
    onRemoveType: (tab: TabItem<ArticleType>) => void;
}

export const ArticleCreateTitle = memo((props: ArticleCreateTitleProps) => {
    const {
        className,
        onChangeTitle,
        onChangeSubtitle,
        title,
        subtitle,
        img,
        types,
        onRemoveType,
    } = props;
    const { t } = useTranslation('articles-edit');

    const tabItems = types?.map((type) => ({
        value: type,
        content: t(type, { ns: 'articles' }),
    })) as TabItem<ArticleType>[];

    return (
        <VStack>
            <Input
                className={classNames('', {}, [className])}
                onChange={onChangeTitle}
                value={title}
                transparent
                placeholder={t('Заголовок')}
                size="xl"
                autofocus
            />
            {img && (
                <AppImage
                    className={cls.img}
                    src={img}
                />
            )}
            {tabItems
                ? (
                    <Tabs
                        tabs={tabItems}
                        className={cls.tabs} onTabClick={onRemoveType as (tab: TabItem<string>) => void}
                    />
                )
                : <Text text={t('Добавьте тэги для страницы')} />}
            <Input
                className={classNames('', {}, [className])}
                onChange={onChangeSubtitle}
                value={subtitle}
                transparent
                placeholder={t('Подзаголовок')}
                size="l"
                bold
            />
        </VStack>

    );
});
