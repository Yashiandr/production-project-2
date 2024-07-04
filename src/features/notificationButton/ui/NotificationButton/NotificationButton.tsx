import {
    memo,
    useCallback,
    useState,
} from 'react';
import {
    BrowserView,
    MobileView,
} from 'react-device-detect';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification-32-32.svg?react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Button,
    ButtonTheme,
} from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import {
    Icon,
    IconColor,
} from '@/shared/ui/Icon';
import { Popover } from '@/shared/ui/Popups';
import * as cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props;
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <Button onClick={onOpenDrawer} theme={ButtonTheme.CLEAR}>
            <Icon Svg={NotificationIcon} className={cls.notificationBtn} color={IconColor.INVERTED} />
        </Button>
    );

    return (
        <>
            <MobileView>
                {trigger}
                <Drawer onClose={onCloseDrawer} isOpen={isOpen}>
                    <NotificationList />
                </Drawer>
            </MobileView>
            <BrowserView>
                <Popover
                    direction="bottom end"
                    className={classNames(cls.NotificationButton, {}, [className])}
                    trigger={trigger}
                >
                    <NotificationList className={cls.notifications} />
                </Popover>
            </BrowserView>
        </>
    );
});
