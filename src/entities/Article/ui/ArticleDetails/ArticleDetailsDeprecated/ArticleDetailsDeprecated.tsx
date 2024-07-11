import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import DateIcon from '@/shared/assets/icons/date-32-32.svg?react';
import ViewersIcon from '@/shared/assets/icons/viewers-32-32.svg?react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Icon, IconColor } from '@/shared/ui/deprecated/Icon';
import { Skeleton } from '@/shared/ui/deprecated/Skeleton';
import { Text, TextAlign, TextSize, TextTheme } from '@/shared/ui/deprecated/Text';

import * as cls from './ArticleDetailsDeprecated.module.scss';
import { ArticleDetailsProps } from '../ArticleDetails';
import {
    useSelectArticleDetailsIsLoading,
} from '../../../model/selectors/selectArticleDetailsIsLoading/selectArticleDetailsIsLoading';
import {
    useSelectArticleDetailsData,
} from '../../../model/selectors/selectArticleDetailsData/selectArticleDetailsData';
import {
    useSelectArticleDetailsError,
} from '../../../model/selectors/selectArticleDetailsError/selectArticleDetailsError';
import { ArticleBlock } from '../../../model/types/article';
import { ArticleBlockType } from '../../../model/consts/consts';
import { ArticleCodeBlockComponent } from '../../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from '../../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from '../../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { fetchArticleById } from '../../../model/services/fetchArticleById';

export const ArticleDetailsDeprecated = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation(['article', 'translation']);
    const dispatch = useAppDispatch();
    const isLoading = useSelectArticleDetailsIsLoading();
    const article = useSelectArticleDetailsData();
    const error = useSelectArticleDetailsError();

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.CODE:
                return (
                    <ArticleCodeBlockComponent block={block} key={block.id} />
                );
            case ArticleBlockType.IMAGE:
                return (
                    <ArticleImageBlockComponent block={block} key={block.id} />
                );
            case ArticleBlockType.TEXT:
                return (
                    <ArticleTextBlockComponent block={block} key={block.id} className={cls.textWrap} />
                );
            default:
                return null;
        }
    }, []);

    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    });

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton
                    className={cls.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={150} />
                <Skeleton className={cls.skeleton} width="100%" height={150} />
            </>
        );
    } else if (error) {
        content = (
            <VStack justify="center" max>
                <Text
                    title={error}
                    align={TextAlign.CENTER}
                    theme={TextTheme.ERROR}
                />
            </VStack>
        );
    } else if (!article) {
        content = (
            <Text
                title={t('Ошибка', { ns: 'translation' })}
                align={TextAlign.CENTER}
                theme={TextTheme.ERROR}
            />
        );
    } else {
        content = (
            <>
                <Avatar
                    size={200}
                    src={article.img}
                    alt={article.img}
                    className={cls.avatar}
                />
                <Text
                    title={article.title}
                    text={article.subtitle}
                    size={TextSize.L}
                />
                <HStack gap="8">
                    <Icon Svg={ViewersIcon} color={IconColor.SECONDARY} />
                    <Text text={String(article.views)} />
                </HStack>
                <HStack data-testid="ArticleDetails.Info" gap="8">
                    <Icon
                        Svg={DateIcon}
                        className={cls.dateIcon}
                        color={IconColor.SECONDARY}
                    />
                    <Text text={article.createdAt} />
                </HStack>
                <VStack gap="16" max align="stretch">
                    {article.blocks?.map(renderBlock)}
                </VStack>
            </>
        );
    }

    return (
            <VStack
                gap="16"
                align="start"
                className={classNames('', {}, [className])}
                data-testid="ArticleDetails"
            >
                {content}
            </VStack>
    );
});
