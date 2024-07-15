import React, { memo, TextareaHTMLAttributes, ChangeEvent, useState, useRef, useLayoutEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './TextareaInput.module.scss';

type HTMLTextareaProps = Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange'
>

interface TextareaInputProps extends HTMLTextareaProps{
    className?: string;
    value: string;
    onChange?: (value: string) => void;
}

const MIN_TEXTAREA_HEIGHT = 38;

export const TextareaInput = memo((props: TextareaInputProps) => {
    const {
        className,
        value,
        onChange,
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

    const onFocus = () => {
        setIsFocused(true);
    };

    return (
        <textarea
            ref={ref}
            className={classNames(cls.TextareaInput, { [cls.focused]: isFocused }, [className])}
            value={value}
            onChange={onChangeHandler}
            onFocus={onFocus}
            onBlur={onBlur}
            rows={1}
            style={{
                minHeight: MIN_TEXTAREA_HEIGHT,
                resize: 'none',
            }}
            {...otherProps}
        />
    );
});
