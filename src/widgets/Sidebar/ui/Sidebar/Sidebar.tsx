import { memo, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { selectSidebarItems } from '../../model/selectors/selectSidebarItems/selectSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import * as cls from './Sidebar.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/redesignIcons/Arrow.svg?react';

interface SidebarProps {
    className?: string;
}

const DeprecatedSidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(isMobile);
    const sidebarItemsList = useAppSelector(selectSidebarItems);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    item={item}
                    key={item.path}
                    collapsed={collapsed}
                />
            )),
        [collapsed, sidebarItemsList],
    );

    return (
        <aside
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsedDeprecated]: collapsed }, [
                className,
            ])}
        >
            <Button
                data-testid="sidebar-toggle"
                type="button"
                onClick={onToggle}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                square
                size={ButtonSize.L}
                className={cls.collapsBtnDeprecated}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <VStack
                gap="8"
                align="start"
                className={cls.itemsDeprecated}
                role="navigation"
            >
                {itemsList}
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} />
            </div>
        </aside>
    );
});

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(isMobile);
    const sidebarItemsList = useAppSelector(selectSidebarItems);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };
    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    item={item}
                    key={item.path}
                    collapsed={collapsed}
                />
            )),
        [collapsed, sidebarItemsList],
    );
    return (
        <ToggleFeatures
            feature="isAppRedesign"
            on={
                (
                    <aside
                        data-testid="sidebar"
                        className={classNames(cls.SidebarRedesigned, {
                            [cls.collapsed]: collapsed,
                        }, [
                            className,
                        ])}
                    >
                        <AppLogo className={cls.appLogo} size={collapsed ? 30 : 50} />
                        <VStack
                            gap="8"
                            max
                            align="start"
                            className={cls.items}
                        >
                            {itemsList}
                        </VStack>
                        <Icon
                            data-testid="sidebar-toggle"
                            onClick={onToggle}
                            className={cls.collapsBtn}
                            Svg={ArrowIcon}
                            clickable
                        />
                        <div className={cls.switchers}>
                            <ThemeSwitcher />
                            <LangSwitcher short={collapsed} className={cls.langSwitcher} />
                        </div>
                    </aside>
                )
            }
            off={<DeprecatedSidebar />}
        />
    );
});
