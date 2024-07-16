import React, { memo, TextareaHTMLAttributes, ChangeEvent, useState, useRef, useLayoutEffect, useEffect } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import * as cls from './TextareaInput.module.scss';

type HTMLTextareaProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange' | 'readOnly'
>

type TextareaInputVariant = 'normal' | 'transparent' | 'code'

interface TextareaInputProps extends HTMLTextareaProps{
    className?: string;
    value: string;
    onChange?: (value: string) => void;
    variant?: TextareaInputVariant;
    readonly?: boolean;
    autofocus?: boolean;
}

const MIN_TEXTAREA_HEIGHT = 38;

export const TextareaInput = memo((props: TextareaInputProps) => {
    const {
        className,
        value,
        onChange,
        variant = 'normal',
        readonly,
        autofocus,
        ...otherProps
    } = props;

    const ref = useRef<HTMLTextAreaElement>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    const [isFocused, setIsFocused] = useState(false);
    const onBlur = () => {
        setIsFocused(false);
    };

    useLayoutEffect(() => {
        if (ref.current) {
            ref.current.style.height = 'inherit';

            // Calculate the height
            const height = ref.current.scrollHeight;
            ref.current.style.height = `${Math.max(
                height + 5,
                MIN_TEXTAREA_HEIGHT,
            )}px`;
        }
    }, [value]);

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onFocus = () => {
        setIsFocused(true);
    };

    const mods: Mods = {
        [cls.focused]: isFocused,
    };

    return (
        <textarea
            ref={ref}
            className={classNames(cls.TextareaInput, mods, [className, cls[variant]])}
            value={value}
            onChange={onChangeHandler}
            onFocus={onFocus}
            onBlur={onBlur}
            rows={1}
            readOnly={readonly}
            style={{
                minHeight: MIN_TEXTAREA_HEIGHT,
                resize: 'none',
            }}
            {...otherProps}
        />
    );
});
