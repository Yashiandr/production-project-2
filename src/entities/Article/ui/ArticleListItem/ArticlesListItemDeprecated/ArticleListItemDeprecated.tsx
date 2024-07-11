import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './ArticleListItemDeprecated.module.scss';
import { Text } from '@/shared/ui/deprecated/Text';
import { Icon } from '@/shared/ui/deprecated/Icon';
import { ArticlesView, ArticleBlockType } from '../../../model/consts/consts';
import { ArticleTextBlock } from '../../../model/types/article';
import { Card } from '@/shared/ui/deprecated/Card';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Button } from '@/shared/ui/deprecated/Button';
import ViewersIcon from '@/shared/assets/icons/viewers-32-32.svg?react';
import { ArticleListItemProps } from '../ArticleListItem';

export const ArticleListItemDeprecated = memo((props: ArticleListItemProps) => {
    const { className, article, view, target } = props;
    const { t } = useTranslation('articles');

    const types = <Text text={article.type?.join(', ')} className={cls.types} />;
    const views = (
        <div className={cls.viewersWrapper}>
            <Icon Svg={ViewersIcon} />
            <Text text={String(article.views)} />
        </div>
    );

    if (view === ArticlesView.BIG) {
        const textBlock = article.blocks?.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;
        return (
            <div
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
                data-testid="ArticleListItem"
            >
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <div className={cls.avatarWrapper}>
                            <Avatar
                                size={30}
                                src={article.user?.avatar}
                                alt={article.user?.username}
                            />
                            <Text title={article.title} />
                        </div>
                        <div className={cls.userWrapper}>
                            <Text text={article.user?.username} />
                            <Text text={article.createdAt} />
                        </div>
                    </div>
                    {types}
                    <AppImage
                        fallback={<Skeleton width="100%" height={250} />}
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                    />
                    {textBlock && (
                        <ArticleTextBlockComponent
                            block={textBlock}
                            className={cls.textBlock}
                        />
                    )}
                    <div className={cls.footer}>
                        <AppLink
                            to={getRouteArticleDetails(article.id)}
                            target={target}
                        >
                            <Button>{t('Читать далее')}</Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
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
