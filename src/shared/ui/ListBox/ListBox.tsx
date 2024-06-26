import {
    Listbox as HListBox,
    ListboxButton as HListBoxButton,
    ListboxOption as HListBoxOption,
    ListboxOptions as HListBoxOptions,
} from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { Button } from '../Button/Button';
import * as cls from './ListBox.module.scss';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

type DropdownDirection = 'top' | 'bottom'

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

export function ListBox(props: ListBoxProps) {
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

    return (
        <>
            {label && <span className={classNames(cls.label, { [cls.readonly]: readonly })}>{`${label}>`}</span>}
            <HListBox
                as="div"
                className={classNames(cls.ListBox, {}, [className])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBoxButton
                    className={cls.trigger}
                >
                    <Button
                        disabled={readonly}
                    >
                        {value ?? defaultValue}
                    </Button>
                </HListBoxButton>
                <HListBoxOptions
                    className={cls.options}
                    anchor={{ to: direction }}
                    as="ul"
                >
                    {items?.map((item, index) => (
                        <HListBoxOption key={item.value} value={item.value} as={Fragment} disabled={item.disabled}>
                            {({ focus, selected }) => {
                                const itemMods: Mods = {
                                    [cls.focus]: focus,
                                    [cls.selected]: selected,
                                    [cls.disabled]: item.disabled,
                                    [cls.first]: index === 0,
                                    [cls.last]: index === Number(items?.length) - 1,
                                };
                                return (
                                    <li
                                        className={classNames(cls.item, itemMods)}
                                    >
                                        {item.content}
                                    </li>
                                );
                            }}
                        </HListBoxOption>
                    ))}
                </HListBoxOptions>
            </HListBox>
        </>
    );
}
