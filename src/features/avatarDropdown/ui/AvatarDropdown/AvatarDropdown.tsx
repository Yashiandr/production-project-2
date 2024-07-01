import {
    isUserAdmin, isUserManager, User, userActions,
} from 'entities/User';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Dropdown } from 'shared/ui/Popups';
import * as cls from './AvatarDropdown.module.scss';

interface AvatarDropdownProps {
    className?: string;
    authData: User;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className, authData } = props;
    const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const isAdmin = useAppSelector(isUserAdmin);
    const isManager = useAppSelector(isUserManager);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    return (
        <Dropdown
            className={classNames(cls.AvatarDropdown, {}, [className])}
            items={[
                ...(isAdminPanelAvailable ? [{
                    content: t('Админка'),
                    href: RoutePath.admin_panel,
                }] : []),
                {
                    content: t('Профиль'),
                    href: RoutePath.profile + authData.id,
                },
                {
                    content: t('Выйти'),
                    onClick: onLogout,
                },

            ]}
            trigger={<Avatar size={30} src={authData.avatar} />}
            direction="bottom end"
        />
    );
});
