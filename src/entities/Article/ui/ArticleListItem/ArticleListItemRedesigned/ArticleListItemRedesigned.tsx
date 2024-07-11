import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ArticleListItemRedesigned.module.scss';
import { ArticleListItemProps } from '../ArticleListItem';
import { ArticlesView, ArticleBlockType } from '../../../model/consts/consts';
import { ArticleTextBlock } from '../../../model/types/article';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { getRouteArticleDetails } from '@/shared/const/router';
import EyeIcon from '@/shared/assets/redesignIcons/Eye.svg?react';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Card } from '@/shared/ui/redesigned/Card';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack, getVStack } from '@/shared/ui/redesigned/Stack';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        target,
        view,
    } = props;
    const { t } = useTranslation('articles');
    const types = <Text text={article.type?.join(', ')} className={cls.types} />;
    const views = (
        <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={String(article.views)} />
        </HStack>
    );

    if (view === ArticlesView.BIG) {
        const textBlock = article.blocks?.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;
        return (

            <Card
                padding="24"
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                    getVStack({
                        max: true,
                        gap: '16',
                        align: 'stretch',
                    }),
                ])}
                data-testid="ArticleListItem"
            >
                <HStack gap="8">
                    <Avatar size={32} src={article.user?.avatar} />
                    <Text bold text={article.user?.username} />
                    <Text text={article.createdAt} />
                </HStack>
                <Text title={article.title} bold />
                <Text title={article.subtitle} size="s" bold />
                <AppImage
                    fallback={<Skeleton width="100%" height={250} />}
                    src={article.img}
                    className={cls.img}
                    alt={article.title}
                />
                {textBlock?.paragraphs && (
                    <Text
                        text={textBlock.paragraphs.slice(0, 2).join(' ')}
                        className={cls.textBlock}
                    />
                )}
                <HStack max justify="between">
                    <AppLink
                        to={getRouteArticleDetails(article.id)}
                        target={target}
                    >
                        <Button>{t('Читать далее')}</Button>
                    </AppLink>
                    {views}
                </HStack>
            </Card>
        );
    }
    return (
        <div
            className={classNames(cls.ArticleListItem, {}, [
                className,
                cls[view],
            ])}
        >
            <AppLink
                target={target}
                to={getRouteArticleDetails(article.id)}
                data-testid="ArticleListItem"
            >
                <Card className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <AppImage
                            fallback={<Skeleton width={200} height={250} />}
                            src={article.img}
                            alt={article.title}
                            className={cls.img}
                        />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <div className={cls.infoWrapper}>
                        {types}
                        {views}
                    </div>
                    <Text text={article.title} className={cls.title} />
                </Card>
            </AppLink>
        </div>
    );
});
