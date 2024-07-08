import {
    Popover as HPopover,
    PopoverButton as HPopoverButton,
    PopoverPanel as HPopoverPanel,
} from '@headlessui/react';
import { ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '../../../../types/ui';
import * as popupCls from '../../styles/popup.module.scss';
import * as cls from './Popover.module.scss';

interface PopoverProps {
    className?: string;
    direction?: DropdownDirection;
    trigger: ReactNode;
    children: ReactNode;
}

export function Popover(props: PopoverProps) {
    const { className, trigger, children, direction = 'bottom' } = props;
    return (
        <HPopover className={classNames(popupCls.popup, {}, [className])}>
            <HPopoverButton as="div" className={popupCls.btn}>
                {trigger}
            </HPopoverButton>
            <HPopoverPanel anchor={direction} className={cls.panel}>
                {children}
            </HPopoverPanel>
        </HPopover>
    );
}
