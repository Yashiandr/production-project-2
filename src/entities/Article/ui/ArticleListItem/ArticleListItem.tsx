import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';
import ViewersIcon from 'shared/assets/icons/viewers-32-32.svg';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { Card } from 'shared/ui/Card/Card';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';
import { ArticleBlockType, ArticlesView } from '../../model/consts/consts';
import { Article, ArticleTextBlock } from '../../model/types/article';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import * as cls from './ArticleListItem.module.scss';

interface ArticleListItemProps {
    className?: string;
    article: Article;
    view: ArticlesView;
    target?: HTMLAttributeAnchorTarget;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view,
        target,
    } = props;
    const { t } = useTranslation('articles');

    const types = <Text text={article.type.join(', ')} className={cls.types} />;
    const views = (
        <div className={cls.viewersWrapper}>
            <Icon Svg={ViewersIcon} />
            <Text text={String(article.views)} />
        </div>
    );

    if (view === ArticlesView.BIG) {
        const textBlock = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT,
        ) as ArticleTextBlock;
        return (
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <div className={cls.avatarWrapper}>
                            <Avatar size={30} src={article.user.avatar} alt={article.user.username} />
                            <Text title={article.title} />
                        </div>
                        <div className={cls.userWrapper}>
                            <Text text={article.user.username} />
                            <Text text={article.createdAt} />
                        </div>
                    </div>
                    {types}
                    <img src={article.img} className={cls.img} alt={article.title} />
                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                    )}
                    <div className={cls.footer}>
                        <AppLink
                            to={`${RoutePath.article_details}/${article.id}`}
                            target={target}
                        >
                            <Button>
                                {t('Читать далее')}
                            </Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        );
    }
    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <AppLink
                target={target}
                to={`${RoutePath.article_details}/${article.id}`}
            >
                <Card className={cls.card}>
                    <div className={cls.imageWrapper}>
                        <img src={article.img} alt={article.title} className={cls.img} />
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
