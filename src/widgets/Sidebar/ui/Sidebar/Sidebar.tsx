import { memo, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector/useAppSelector';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { selectSidebarItems } from '../../model/selectors/selectSidebarItems/selectSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import * as cls from './Sidebar.module.scss';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/AppLogo';

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
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [
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
                className={cls.collapsBtn}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <VStack
                gap="8"
                align="start"
                className={cls.items}
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

export const Sidebar = memo(({ className }: SidebarProps) => (
        <ToggleFeatures
            feature="isAppRedesign"
            on={
                (
                    <aside
                        data-testid="sidebar"
                        className={classNames(cls.SidebarRedesigned, {}, [
                            className,
                        ])}
                    >
                        <AppLogo className={cls.appLogo} />
                    </aside>
                )
            }
            off={<DeprecatedSidebar />}
        />
    ));
