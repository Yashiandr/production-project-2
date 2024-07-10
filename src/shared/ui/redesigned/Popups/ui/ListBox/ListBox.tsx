import {
    Listbox as HListBox,
    ListboxButton as HListBoxButton,
    ListboxOption as HListBoxOption,
    ListboxOptions as HListBoxOptions,
} from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { Button } from '../../../Button';
import { HStack } from '../../../Stack';
import * as popupCls from '../../styles/popup.module.scss';
import * as cls from './ListBox.module.scss';

export interface ListBoxItem<T extends string> {
    value: T;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    items?: ListBoxItem<T>[];
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange: (value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

export function ListBox<T extends string>(props: ListBoxProps<T>) {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction,
        label,
    } = props;

    const selectedItem = useMemo(() => items?.find((item) => item.value === value), [value, items]);

    return (
        <HStack gap="4">
            {label && (
                <span
                    className={classNames(cls.label, {
                        [cls.readonly]: readonly,
                    })}
                >
                    {`${label}>`}
                </span>
            )}
            <HListBox
                as="div"
                className={classNames(popupCls.popup, {}, [className])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBoxButton className={popupCls.btn} as="div">
                    <Button variant="filled" disabled={readonly}>{selectedItem?.content ?? defaultValue}</Button>
                </HListBoxButton>
                <HListBoxOptions
                    className={classNames(cls.options, {}, [popupCls.menu])}
                    anchor={{ to: direction }}
                    as="ul"
                >
                    {items?.map((item, index) => (
                        <HListBoxOption
                            key={item.value}
                            value={item.value}
                            as={Fragment}
                            disabled={item.disabled}
                        >
                            {({ focus, selected }) => {
                                const itemMods: Mods = {
                                    [cls.focus]: focus,
                                    [cls.selected]: selected,
                                    [popupCls.disabled]: item.disabled,
                                    [cls.first]: index === 0,
                                    [cls.last]:
                                        index === Number(items?.length) - 1,
                                };
                                return (
                                    <li
                                        className={classNames(
                                            cls.item,
                                            itemMods,
                                        )}
                                    >
                                        {item.content}
                                    </li>
                                );
                            }}
                        </HListBoxOption>
                    ))}
                </HListBoxOptions>
            </HListBox>
        </HStack>
    );
}
