import React, { ReactNode } from 'react';
import { classNames, Mods } from '../../../lib/classNames/classNames';
import { Portal } from '../Portal';
import { useModal } from '../../../lib/hooks/useModal/useModal';
import { Overlay } from '../Overlay';
import * as cls from './Modal.module.scss';
import { toggleFeatures } from '../../../lib/features';

type PopUpDirection = 'center' | 'left' | 'right';

interface ModalProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
    direction?: PopUpDirection;
}

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy = true,
        direction = 'center',
    } = props;

    const { close, isMounted, isClosing } = useModal({
        animationDelay: 300,
        onClose,
        isOpen,
    });

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    };

    const onContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={classNames(cls.Modal, mods, [cls[direction],
                toggleFeatures({
                    name: 'isAppRedesign',
                    on: () => cls.modalNew,
                    off: () => cls.modalOld,
                })])}
            >
                <Overlay onClick={close} />
                <div className={classNames(cls.content, {}, [className, cls[direction]])} onClick={onContentClick}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
