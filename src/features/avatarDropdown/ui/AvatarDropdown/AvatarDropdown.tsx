import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { isUserAdmin, isUserManager, User, userActions } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import * as cls from './AvatarDropdown.module.scss';
import { getRouteAdminPanel, getRouteProfile, getRouteSettings } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

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

    const items = [
        ...(isAdminPanelAvailable
            ? [
                {
                    content: t('Админка'),
                    href: getRouteAdminPanel(),
                },
            ]
            : []),
        {
            content: t('Профиль'),
            href: getRouteProfile(authData.id),
        },
        {
            content: t('Настройки'),
            href: getRouteSettings(),
        },
        {
            content: t('Выйти'),
            onClick: onLogout,
        },
    ];

    return (
<ToggleFeatures
        feature="isAppRedesign"
        on={(
<Dropdown
            className={classNames(cls.AvatarDropdown, {}, [className])}
            items={items}
            trigger={<Avatar size={48} src={authData.avatar} />}
            direction="bottom end"
/>
)}
        off={(
<DropdownDeprecated
            className={classNames(cls.AvatarDropdown, {}, [className])}
            items={items}
            trigger={<AvatarDeprecated size={30} src={authData.avatar} />}
            direction="bottom end"
/>
)}
/>

    );
});
