import {
    Listbox as HListBox,
    ListboxButton as HListBoxButton,
    ListboxOption as HListBoxOption,
    ListboxOptions as HListBoxOptions,
} from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { classNames, Mods } from '../../../../lib/classNames/classNames';
import { DropdownDirection } from '../../../../types/ui';
import { Button } from '../../../Button/Button';
import { HStack } from '../../../Stack';
import * as popupCls from '../../styles/popup.module.scss';
import * as cls from './ListBox.module.scss';

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

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
        <HStack gap="4">
            {label && <span className={classNames(cls.label, { [cls.readonly]: readonly })}>{`${label}>`}</span>}
            <HListBox
                as="div"
                className={classNames(popupCls.popup, {}, [className])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBoxButton
                    className={popupCls.btn}
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
                                    [popupCls.disabled]: item.disabled,
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
        </HStack>
    );
}