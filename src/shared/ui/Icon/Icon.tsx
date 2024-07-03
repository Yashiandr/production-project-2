import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import * as cls from './Icon.module.scss';

export enum IconColor {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    INVERTED = 'inverted',
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
    className?: string;
    Svg: React.FC<React.SVGProps<SVGSVGElement>>;
    color?: IconColor;
}

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        color = IconColor.PRIMARY,
        ...otherProps
    } = props;
    return (
        <Svg
            className={classNames(cls.Icon, {}, [className, cls[color]])}
            {...otherProps}
        />
    );
});
