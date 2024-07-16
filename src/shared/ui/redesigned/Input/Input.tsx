import React, { InputHTMLAttributes, memo, useEffect, useRef, useState, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { getHStack, HStack } from '../Stack';
import * as cls from './Input.module.scss';
import { Text } from '../Text';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly' | 'size'| 'onBlue' | 'onFocus'
>;

type InputSize = 's' | 'm' | 'l' | 'xl'

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    label?: string;
    autofocus?: boolean;
    readonly?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    transparent?: boolean;
    size?: InputSize;
    bold?: boolean;
    onBlur?: () => void;
    onFocus?: () => void
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        type = 'text',
        label,
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        transparent,
        size = 'm',
        bold,
        onBlur,
        onFocus,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const [isFocused, setIsFocused] = useState(false);

    const onBlurHandler = () => {
        onBlur?.();
        setIsFocused(false);
    };

    const onFocusHandler = () => {
        onFocus?.();
        setIsFocused(true);
    };

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls.focused]: isFocused,
        [cls.transparent]: transparent,
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
        [cls.withLabel]: Boolean(label),
        [cls.bold]: bold,
    };

    const inputContent = (
        <div
            className={classNames(cls.InputWrapper, mods, [className, getHStack()])}
        >
            {addonLeft && (
                <div className={classNames(cls.addonLeft, {}, [getHStack()])}>
                    {addonLeft}
                </div>
            )}
            <input
                ref={ref}
                className={classNames(cls.input, {}, [cls[size]])}
                value={value}
                onChange={onChangeHandler}
                type={type}
                onFocus={onFocusHandler}
                onBlur={onBlurHandler}
                readOnly={readonly}
                placeholder={placeholder}
                {...otherProps}
            />
            {addonRight && (
                <div className={classNames(cls.addonRight, {}, [getHStack()])}>
                    {addonRight}
                </div>
            )}
        </div>
    );

    return label ? (
        <HStack max gap="8">
            <Text
                text={`${label}:`}
                className={cls.label}
            />
            {inputContent}
        </HStack>
    ) : inputContent;
});
