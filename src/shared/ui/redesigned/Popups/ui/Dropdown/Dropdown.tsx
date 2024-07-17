import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { AppLink } from '../../../AppLink';
import * as popupCls from '../../styles/popup.module.scss';
import * as cls from './Dropdown.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { Button, ButtonVariant } from '../../../Button';

export interface DropdownItem {
    disabled?: boolean;
    content: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    direction?: DropdownDirection;
    gap?: number | string;
    fullWidth?: boolean;
    variant?: ButtonVariant;
}

export function Dropdown(props: DropdownProps) {
    const { className, items, trigger, direction = 'bottom', gap = 0, fullWidth, variant = 'clear' } = props;
    return (
        <Menu as="div" className={classNames(popupCls.popup, {}, [className])}>
            <MenuButton as={Button} className={classNames(popupCls.btn, {}, [className])} variant={variant}>
                {trigger}
            </MenuButton>
            <MenuItems className={classNames(cls.menu, { [popupCls.fullWidth]: fullWidth }, [popupCls.menu])} anchor={{ to: direction, gap }}>
                {items.map((item, index) => {
                    const content = ({ focus }: { focus: boolean }) => (
                        <button
                            type="button"
                            onClick={item.onClick}
                            className={classNames(cls.item, {
                                [cls.focus]: focus,
                                [popupCls.disabled]: item.disabled,
                            })}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <MenuItem
                                as={AppLink}
                                className={cls.link}
                                to={item.href}
                                disabled={item.disabled}
                                // readonly={item.disabled}
                                key={`dropdown-key-${index}`}
                            >
                                {content}
                            </MenuItem>
                        );
                    }

                    return (
                        <MenuItem
                            as={Fragment}
                            disabled={item.disabled}
                            key={`dropdown-key-${index}`}
                        >
                            {content}
                        </MenuItem>
                    );
                })}
            </MenuItems>
        </Menu>
    );
}
