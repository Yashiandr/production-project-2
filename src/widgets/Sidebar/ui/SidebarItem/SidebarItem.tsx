import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { selectUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { AppLink as AppLinkDeprecated, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { SidebarItemType } from '../../model/types/item';
import * as cls from './SidebarItem.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

interface SidebarItemProps {
    item: SidebarItemType;
    collapsed: boolean;
}

const DeprecatedSidebarItem = memo((props: SidebarItemProps) => {
    const { item, collapsed } = props;
    const { t } = useTranslation();
    const isAuth = useAppSelector(selectUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <AppLinkDeprecated
            to={item.path}
            theme={AppLinkTheme.SECONDARY}
            className={classNames(cls.SidebarItemDeprecated, {
                [cls.collapsedDeprecated]: collapsed,
            })}
        >
            <item.Icon />
            <span className={cls.linkTextDeprecated}>{t(item.text)}</span>
        </AppLinkDeprecated>
    );
});

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { item, collapsed } = props;
    const { t } = useTranslation();
    const isAuth = useAppSelector(selectUserAuthData);

    if (item.authOnly && !isAuth) {
        return null;
    }

    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={(
                <AppLink
                    activeClassName={cls.active}
                    to={item.path}
                    className={classNames(cls.item, {
                        [cls.collapsed]: collapsed,
                    })}
                >
                    <Icon Svg={item.Icon} />
                    <span className={cls.linkText}>{t(item.text)}</span>
                </AppLink>
            )}
            off={<DeprecatedSidebarItem item={item} collapsed={collapsed} />}
        />

    );
});
