import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { AppLink } from '../../../AppLink';
import * as popupCls from '../../styles/popup.module.scss';
import * as cls from './Dropdown.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';

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
}

/**
 * @deprecated
 */
export function Dropdown(props: DropdownProps) {
    const { className, items, trigger, direction = 'bottom' } = props;
    return (
        <Menu as="div" className={classNames(popupCls.popup, {}, [className])}>
            <MenuButton as="div" className={popupCls.btn}>
                {trigger}
            </MenuButton>
            <MenuItems className={cls.menu} anchor={direction}>
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
                                readonly={item.disabled}
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
