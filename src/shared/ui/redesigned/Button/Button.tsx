import { ButtonHTMLAttributes, memo, PropsWithChildren } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import * as cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonSize = 'm' |'l' | 'xl'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
}

export const Button = memo((props: PropsWithChildren<ButtonProps>) => {
    const {
        className,
        children,
        variant = 'outline',
        square = false,
        size = 'm',
        disabled = false,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
    };

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className, cls[variant], cls[size]])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    );
});
