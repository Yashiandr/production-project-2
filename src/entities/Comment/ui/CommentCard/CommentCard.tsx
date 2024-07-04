import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    AppLink,
    AppLinkTheme,
} from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';
import {
    HStack,
    VStack,
} from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Comment } from '../../model/types/comment';
import * as cls from './CommentCard.module.scss';
import { RoutePath } from '@/shared/const/router';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const {
        className,
        comment,
        isLoading,
    } = props;

    if (isLoading) {
        return (
            <VStack align="stretch" className={classNames(cls.CommentCard, {}, [className])}>
                <HStack gap="8">
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton height={24} width={100} />
                </HStack>
                <Skeleton width="100%" height={32} />
            </VStack>

        );
    }

    if (!comment) {
        return null;
    }

    return (
        <VStack align="stretch" gap="8" className={classNames(cls.CommentCard, {}, [className])}>
            <AppLink
                to={`${RoutePath.profile}${comment.user.id}`}
                className={cls.header}
                theme={AppLinkTheme.NON_INVERT}
            >
                {comment.user.avatar
                    ? <Avatar src={comment.user.avatar} size={30} alt={comment.user.username} />
                    : null}
                <Text title={comment.user.username} />
            </AppLink>
            <Text text={comment.text} />
        </VStack>
    );
});
