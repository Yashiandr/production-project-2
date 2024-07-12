import React, { ButtonHTMLAttributes, memo, PropsWithChildren, ReactNode } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import * as cls from './Button.module.scss';
import { getHStack } from '../Stack';

export type ButtonVariant = 'clear' | 'outline' | 'filled';

export type ButtonSize = 'm' |'l' | 'xl'

export type ButtonColor = 'normal' |'success' | 'error'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    color?: ButtonColor,
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
}

export const Button = memo((props: PropsWithChildren<ButtonProps>) => {
    const {
        className,
        children,
        variant = 'outline',
        square = false,
        size = 'm',
        color = 'normal',
        disabled = false,
        addonRight,
        addonLeft,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
        [cls.withAddon]: Boolean(addonLeft) || Boolean(addonRight),
    };

    const additionalClasses = [className, cls[variant], cls[size], cls[color], getHStack()];

    return (

        <button
            type="button"
            className={classNames(cls.Button, mods, additionalClasses)}
            disabled={disabled}
            {...otherProps}
        >
            {addonLeft && (
                <div className={classNames(cls.addonLeft, {}, [getHStack()])}>
                    {addonLeft}
                </div>
            )}
            {children}
            {addonRight && (
                <div className={classNames(cls.addonRight, {}, [getHStack()])}>
                    {addonRight}
                </div>
            )}
        </button>
    );
});
