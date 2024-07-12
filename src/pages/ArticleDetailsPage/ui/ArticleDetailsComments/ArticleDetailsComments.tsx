import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/AddNewComment';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
    selectArticleDetailsCommentsIsLoading,
} from '../../model/selectors/comments/selectArticleDetailsCommentsIsLoading/articleDetailsCommentsIsLoading';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsArticleById } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleDetailsCommentsProps {
    className?: string;
    id: string;
}

export const ArticleDetailsComments = memo(
    (props: ArticleDetailsCommentsProps) => {
        const { className, id } = props;
        const { t } = useTranslation('articles');
        const dispatch = useAppDispatch();
        const comments = useAppSelector(getArticleComments.selectAll);
        const commentsIsLoading = useAppSelector(
            selectArticleDetailsCommentsIsLoading,
        );

        useInitialEffect(() => {
            dispatch(fetchCommentsArticleById(id));
        });

        const onSendComment = useCallback(
            (text: string) => {
                dispatch(addCommentForArticle(text));
            },
            [dispatch],
        );

        return (
            <VStack
                gap="32"
                align="stretch"
                className={classNames('', {}, [className])}
            >
                <ToggleFeatures
                    feature="isAppRedesign"
                    on={<Text title={t('Комментарии')} size="l" />}
                    off={<Text title={t('Комментарии')} />}
                />
                <AddCommentForm onSendComment={onSendComment} />
                <CommentList
                    comments={comments}
                    isLoading={commentsIsLoading}
                />
            </VStack>
        );
    },
);
