import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Text } from '@/shared/ui/redesigned/Text';
import { Notification } from '../../model/types/notification';
import * as cls from './NotificationItem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

interface NotificationItemProps {
    className?: string;
    item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props;

    const content = (
        <ToggleFeatures
            feature="isAppRedesign"
            on={(
                <Card
                    variant="normal"
                    className={classNames(cls.NotificationItem, {}, [className])}
                >
                    <Text title={item.title} text={item.description} />
                </Card>
            )}
            off={(
                <CardDeprecated
                    theme={CardTheme.OUTLINED}
                    className={classNames(cls.NotificationItem, {}, [className])}
                >
                    <TextDeprecated title={item.title} text={item.description} />
                </CardDeprecated>
            )}
        />

    );

    if (item.href) {
        return (
            <AppLink className={cls.link} to={item.href} target="_blank">
                {content}
            </AppLink>
        );
    }

    return content;
});
