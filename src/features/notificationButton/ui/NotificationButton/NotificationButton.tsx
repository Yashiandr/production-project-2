import { NotificationList } from 'entities/Notification';
import { memo } from 'react';
import NotificationIcon from 'shared/assets/icons/notification-32-32.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon, IconColor, IconFill } from 'shared/ui/Icon/Icon';
import { Popover } from 'shared/ui/Popups';
import * as cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;

    return (
        <Popover
            direction="bottom end"
            className={classNames(cls.NotificationButton, {}, [className])}
            trigger={(
                <Button theme={ButtonTheme.CLEAR}>
                    <Icon Svg={NotificationIcon} color={IconColor.INVERTED} fill={IconFill.STROKE} />
                </Button>
            )}
        >
            <NotificationList className={cls.notifications} />
        </Popover>
    );
});
