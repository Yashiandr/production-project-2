import { memo, ReactNode } from 'react';
import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { Portal } from '../../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import * as cls from './Drawer.module.scss';

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
    } = props;
    const mods: Mods = {
        [cls.opened]: isOpen,
    };

    return (
        <Portal>
            <div className={classNames(cls.Drawer, mods, [className])}>
                <Overlay onClick={onClose} />
                <div
                    className={cls.content}
                >
                    {isOpen ? children : null}
                </div>
            </div>
        </Portal>

    );
});
