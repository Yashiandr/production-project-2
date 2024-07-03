import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { selectUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
import { SidebarItemType } from '../../model/types/item';
import * as cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const {
        item,
        collapsed,
    } = props;
    const { t } = useTranslation();
    const isAuth = useAppSelector(selectUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLink
            to={item.path}
            theme={AppLinkTheme.SECONDARY}
            className={classNames(cls.SidebarItem, { [cls.collapsed]: collapsed })}
        >
            <item.Icon />
            <span className={cls.linkText}>
                {t(item.text)}
            </span>
        </AppLink>

    );
});
