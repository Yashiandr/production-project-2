import { memo, ReactElement, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './MobileLayout.module.scss';
import { Icon } from '@/shared/ui/redesigned/Icon';
import MenuIcon from '@/shared/assets/redesignIcons/MenuHamburger.svg';
import { Drawer } from '../../ui/redesigned/Drawer';

interface MobileLayoutProps {
    className?: string;
    header?: ReactElement;
    content: ReactElement;
    sidebar: ReactElement;
    toolbar?: ReactElement;
}

export const MobileLayout = memo((props: MobileLayoutProps) => {
    const {
        className,
        header,
        content,
        sidebar,
        toolbar,
    } = props;
    const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

    const sidebarOnClose = () => {
        setSidebarIsOpen(false);
    };

    const sidebarOnOpen = () => {
        setSidebarIsOpen(true);
    };

    return (
        <div className={classNames(cls.MobileLayout, {}, [className])}>
            <div className={cls.header}>
                <Icon Svg={MenuIcon} clickable onClick={sidebarOnOpen} />
                {header}
            </div>
            <div className={cls.content}>
                {content}
            </div>
            <div className={cls.toolbar}>{toolbar}</div>
            <Drawer
                className={cls.sidebar}
                direction="left"
                isOpen={sidebarIsOpen}
                onClose={sidebarOnClose}
                transparent
            >
                {sidebar}
            </Drawer>
        </div>
    );
});
