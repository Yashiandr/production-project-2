import { memo } from 'react';
import { HStack, VStack, getVStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Comment } from '../../model/types/comment';
import * as cls from './CommentCard.module.scss';
import { getRouteProfile } from '@/shared/const/router';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Text } from '@/shared/ui/redesigned/Text';
import { Card } from '@/shared/ui/redesigned/Card';

interface CommentCardProps {
    className?: string;
    comment?: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const { className, comment, isLoading } = props;

    const Skeleton = toggleFeatures({
        name: 'isAppRedesign',
        on: () => SkeletonRedesigned,
        off: () => SkeletonDeprecated,
    });

    const Loading = (
        toggleFeatures({
            name: 'isAppRedesign',
            on: () => (
                <Card
                    data-testid="CommendCard.Loading"
                    padding="24"
                    border="round"
                    className={classNames('', {}, [className,
                        getVStack({
                            align: 'stretch',
                        })])}
                >
                    <HStack gap="8">
                        <Skeleton width={30} height={30} border="50%" />
                        <Skeleton height={24} width={100} />
                    </HStack>
                    <Skeleton width="100%" height={32} />
                </Card>
            ),
            off: () => (
                <VStack
                    data-testid="CommendCard.Loading"
                    align="stretch"
                    className={classNames(cls.CommentCard, {}, [className])}
                >
                    <HStack gap="8">
                        <Skeleton width={30} height={30} border="50%" />
                        <Skeleton height={24} width={100} />
                    </HStack>
                    <Skeleton width="100%" height={32} />
                </VStack>
            ),
        })
    );

    if (isLoading) {
        return Loading;
    }

    if (!comment) {
        return null;
    }

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={(
                <Card
                    padding="24"
                    data-testid="CommentCard.Content"
                    className={classNames('', {}, [className,
                        getVStack({
                            align: 'stretch',
                            gap: '8',
                        }),
                    ])}
                >
                    <AppLink
                        to={getRouteProfile(comment.user.id)}
                        className={cls.header}
                    >
                        {comment.user.avatar ? (
                            <Avatar
                                src={comment.user.avatar}
                                size={30}
                                alt={comment.user.username}
                            />
                        ) : null}
                        <Text text={comment.user.username} bold />
                    </AppLink>
                    <Text text={comment.text} />
                </Card>
            )}
            off={(
                <VStack
                    data-testid="CommentCard.Content"
                    align="stretch"
                    gap="8"
                    className={classNames(cls.CommentCard, {}, [className])}
                >
                    <AppLinkDeprecated
                        to={getRouteProfile(comment.user.id)}
                        className={cls.header}
                        theme={AppLinkTheme.NON_INVERT}
                    >
                        {comment.user.avatar ? (
                            <AvatarDeprecated
                                src={comment.user.avatar}
                                size={30}
                                alt={comment.user.username}
                            />
                        ) : null}
                        <TextDeprecated title={comment.user.username} />
                    </AppLinkDeprecated>
                    <TextDeprecated text={comment.text} />
                </VStack>
            )}
        />
    );
});
