import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import * as cls from './ArticleDetailsRedesigned.module.scss';
import { ArticleDetailsProps } from '../ArticleDetails';
import {
    useSelectArticleDetailsData,
} from '../../../model/selectors/selectArticleDetailsData/selectArticleDetailsData';
import {
    useSelectArticleDetailsIsLoading,
} from '../../../model/selectors/selectArticleDetailsIsLoading/selectArticleDetailsIsLoading';
import {
    useSelectArticleDetailsError,
} from '../../../model/selectors/selectArticleDetailsError/selectArticleDetailsError';
import { fetchArticleById } from '../../../model/services/fetchArticleById';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { Text } from '@/shared/ui/redesigned/Text';
import { renderBlock } from './renderBlock';
import { AppImage } from '@/shared/ui/redesigned/AppImage';

export const ArticleDetailsRedesigned = memo((props: ArticleDetailsProps) => {
    const { className, id } = props;
    const { t } = useTranslation(['article', 'translation']);
    const dispatch = useAppDispatch();
    const isLoading = useSelectArticleDetailsIsLoading();
    const article = useSelectArticleDetailsData();
    const error = useSelectArticleDetailsError();

    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    });

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton width="50%" height={40} />
                <Skeleton width="25%" height={32} />
                <Skeleton
                    width="100%"
                    height={420}
                />
                <Skeleton width="100%" height={150} />
                <Skeleton width="100%" height={150} />
            </>
        );
    } else if (error) {
        content = (
            <VStack justify="center" max>
                <Text
                    title={error}
                    align="center"
                    variant="error"
                />
            </VStack>
        );
    } else if (!article) {
        content = (
            <Text
                title={t('Ошибка', { ns: 'translation' })}
                align="center"
                variant="error"
            />
        );
    } else {
        content = (
            <>
                <Text
                    title={article.title}
                    size="l"
                    bold
                />
                <Text
                    text={article.subtitle}
                    size="l"
                />
                <AppImage
                    fallback={<Skeleton width="100%" height={420} border="16px" />}
                    src={article.img}
                    alt={article.title}
                    className={cls.img}
                />
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
