import React, { InputHTMLAttributes, memo, useEffect, useRef, useState, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { getHStack } from '../Stack';
import * as cls from './Input.module.scss';

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        placeholder,
        type = 'text',
        autofocus,
        readonly,
        addonLeft,
        addonRight,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const [isFocused, setIsFocused] = useState(false);

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
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
        [cls.withAddonLeft]: Boolean(addonLeft),
        [cls.withAddonRight]: Boolean(addonRight),
    };

    return (
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
                className={cls.input}
                value={value}
                onChange={onChangeHandler}
                type={type}
                onFocus={onFocus}
                onBlur={onBlur}
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
});
