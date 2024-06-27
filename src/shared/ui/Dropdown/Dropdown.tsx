import {
    Menu, MenuButton, MenuItem, MenuItems,
} from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import { DropdownDirection } from '../../types/ui';
import { AppLink } from '../AppLink/AppLink';
import * as cls from './Dropdown.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    direction?: DropdownDirection;
}

export function Dropdown(props: DropdownProps) {
    const {
        className,
        items,
        trigger,
        direction = 'bottom',
    } = props;
    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <MenuButton className={cls.btn}>
                {trigger}
            </MenuButton>
            <MenuItems className={cls.menu} anchor={direction}>
                {items.map((item) => {
                    const content = ({ focus }: { focus: boolean }) => (
                        <button
                            type="button"
                            onClick={item.onClick}
                            className={classNames(cls.item, { [cls.focus]: focus, [cls.disabled]: item.disabled })}
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
                            >
                                {content}
                            </MenuItem>
                        );
                    }

                    return (
                        <MenuItem as={Fragment} disabled={item.disabled}>
                            {content}
                        </MenuItem>
                    );
                })}
            </MenuItems>
        </Menu>
    );
}
