import React, { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import * as cls from './Icon.module.scss';

export enum IconColor {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    INVERTED = 'inverted',
}

export enum IconFill {
    FILL = 'fill',
    STROKE = 'stroke'
}

interface IconProps {
    className?: string;
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    color?: IconColor;
    fill?: IconFill;
}

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        color = IconColor.PRIMARY,
        fill = IconFill.FILL,
    } = props;
    return (
        <Svg className={classNames(cls.Icon, {}, [className, cls[color], cls[fill]])} />
    );
});
