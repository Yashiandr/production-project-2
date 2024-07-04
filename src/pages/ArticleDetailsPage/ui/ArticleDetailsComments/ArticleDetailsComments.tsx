import {
    memo,
    useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/AddNewComment';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { selectArticleDetailsCommentsIsLoading } from '../../model/selectors/comments/selectArticleDetailsCommentsIsLoading/articleDetailsCommentsIsLoading';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
import { fetchCommentsArticleById } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slice/articleDetailsCommentsSlice';

interface ArticleDetailsCommentsProps {
    className?: string;
    id: string;
}

export const ArticleDetailsComments = memo((props: ArticleDetailsCommentsProps) => {
    const {
        className,
        id,
    } = props;
    const { t } = useTranslation('articles');
    const dispatch = useAppDispatch();
    const comments = useAppSelector(getArticleComments.selectAll);
    const commentsIsLoading = useAppSelector(selectArticleDetailsCommentsIsLoading);

    useInitialEffect(() => {
        dispatch(fetchCommentsArticleById(id));
    });

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForArticle(text));
    }, [dispatch]);

    return (
        <VStack gap="32" align="stretch" className={classNames('', {}, [className])}>
            <Text title={t('Комментарии')} />
            <AddCommentForm onSendComment={onSendComment} />
            <CommentList
                comments={comments}
                isLoading={commentsIsLoading}
            />
        </VStack>
    );
});
