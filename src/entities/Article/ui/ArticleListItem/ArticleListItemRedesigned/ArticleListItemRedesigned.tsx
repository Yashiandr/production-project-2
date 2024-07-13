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
import { HStack, getVStack, VStack } from '@/shared/ui/redesigned/Stack';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        target,
        view,
    } = props;
    const { t } = useTranslation('articles');
    const views = (
        <HStack gap="8">
            <Icon Svg={EyeIcon} />
            <Text text={String(article.views)} />
        </HStack>
    );

    const userInfo = (
        <>
            <Avatar size={32} src={article.user?.avatar} />
            <Text bold text={article.user?.username} />
        </>
    );
    const textBlock = article.blocks?.find(
        (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    const textBlockContent = textBlock?.paragraphs && (
        <Text
            text={textBlock.paragraphs.slice(0, 2).join(' ')}
            className={cls.textBlock}
        />
    );

    if (view === ArticlesView.BIG) {
        return (
            <Card
                padding="24"
                className={classNames('', {}, [
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
                    {userInfo}
                    <Text text={article.createdAt} />
                </HStack>
                <Text title={article.title} bold />
                <Text title={article.subtitle} size="s" bold />
                <AppImage
                    fallback={<Skeleton width="100%" height={420} />}
                    src={article.img}
                    className={cls.img}
                    alt={article.title}
                />
                {textBlockContent}
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
        <AppLink
            data-testid="ArticleListItem"
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames('', {}, [
                className,
                cls[view],
            ])}
        >
            <Card
                border="partial" className={classNames(
                cls.card,
                {},
                [getVStack({ gap: '8' })],
            )}
            >
                <AppImage
                    fallback={<Skeleton width="100%" height={140} />}
                    src={article.img}
                    className={cls.img}
                    alt={article.title}
                />
                <VStack gap="4" className={cls.info}>
                    <Text title={article.title} className={cls.title} />
                    <VStack
                        gap="4"
                        max
                        className={cls.footer}
                        align="stretch"
                    >
                        <HStack justify="between" max>
                            <Text
                                text={article.createdAt}
                            />
                            {views}
                        </HStack>
                        <HStack gap="4">
                            {userInfo}
                        </HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    );
});
