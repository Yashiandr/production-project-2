import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
export type CardPadding = '0' | '8' | '16' | '24';
export type CardBorder = 'round' | 'regular';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariant;
    padding?: CardPadding;
    border?: CardBorder;
}

const mapPaddingToClass: Record<CardPadding, string> = {
    0: 'padding_0',
    8: 'padding_8',
    16: 'padding_16',
    24: 'padding_24',
};

export const Card = memo((props: CardProps) => {
    const {
        className,
        children,
        variant = 'normal',
        padding = '8',
        border = 'regular',
        ...otherProps
    } = props;

    const paddings = mapPaddingToClass[padding];

    const additionalClasses = [className, cls[variant], cls[paddings], cls[border]];

    return (
        <div
            className={classNames('', {}, additionalClasses)}
            {...otherProps}
        >
            {children}
        </div>
    );
});
